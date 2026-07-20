"""Create normalized Breakbase JSON imports from Wikipedia's BC One brackets.

Usage: python scripts/extract-red-bull-bc-one-history.py
"""

from __future__ import annotations

import io
import json
import re
import urllib.request
from pathlib import Path

import pandas as pd
from lxml import html


SOURCE_URL = "https://en.wikipedia.org/wiki/Red_Bull_BC_One"
OUTPUT_DIR = Path(__file__).resolve().parents[1] / "data" / "imports" / "red-bull-bc-one"

EDITIONS = {
    2023: {"tables": (10, 12), "date": "2023-10-21", "timezone": "Europe/Paris", "city": "Paris", "country": "FR"},
    2022: {"tables": (14, 16), "date": "2022-11-12", "timezone": "America/New_York", "city": "New York City", "country": "US"},
    2021: {"tables": (18, 20), "date": "2021-11-06", "timezone": "Europe/Warsaw", "city": "Gdańsk", "country": "PL"},
    2020: {"tables": (22, 24), "date": "2020-11-28", "timezone": "Europe/Vienna", "city": "Salzburg", "country": "AT"},
    2019: {"tables": (26, 28), "date": "2019-11-09", "timezone": "Asia/Kolkata", "city": "Mumbai", "country": "IN"},
    2018: {"tables": (29, 31), "date": "2018-09-29", "timezone": "Europe/Zurich", "city": "Zurich", "country": "CH"},
}

COUNTRY_CODES = {
    "Algeria": "DZ", "Argentina": "AR", "Austria": "AT", "Belarus": "BY",
    "Belgium": "BE", "Brazil": "BR", "Bulgaria": "BG",
    "Canada": "CA", "China": "CN", "Colombia": "CO", "Denmark": "DK",
    "Ecuador": "EC", "Finland": "FI",
    "France": "FR", "Germany": "DE", "Greece": "GR", "India": "IN",
    "Italy": "IT", "Japan": "JP", "Kazakhstan": "KZ", "Lithuania": "LT", "Malaysia": "MY",
    "Mexico": "MX", "Morocco": "MA", "Netherlands": "NL", "Norway": "NO",
    "Poland": "PL", "Portugal": "PT", "Russia": "RU", "Slovenia": "SI",
    "South Africa": "ZA", "South Korea": "KR", "Spain": "ES", "Sweden": "SE",
    "Switzerland": "CH", "Taiwan": "TW", "Ukraine": "UA",
    "United Kingdom": "GB", "United States": "US", "Venezuela": "VE", "Vietnam": "VN",
}

NAME_ALIASES = {"Lil Zoo1": "Lil Zoo"}


def clean_name(value: object) -> str:
    # Wikipedia appends a superscript battle-order marker (1 or 2) to names.
    text = str(value).strip()
    # A preceding 3 marks a Last Chance Cypher qualifier, not part of the name.
    text = re.sub(r"3(?=[12]$)", "", text)
    text = re.sub(r"[12]$", "", text)
    return NAME_ALIASES.get(text, text)


def score(value: object) -> int:
    match = re.search(r"\d+", str(value))
    if not match:
        raise ValueError(f"Missing score in {value!r}")
    return int(match.group())


def round_columns(frame: pd.DataFrame) -> list[tuple[int, str]]:
    labels = []
    for index, value in enumerate(frame.iloc[0].tolist()):
        text = str(value).lower()
        if "round of 16" in text:
            labels.append((index, "round_of_16"))
        elif "quarter" in text:
            labels.append((index, "quarterfinal"))
        elif "semi" in text:
            labels.append((index, "semifinal"))
        elif "final" in text:
            labels.append((index, "final"))
    # Merged header cells can appear twice; the name column is the first occurrence.
    unique = []
    for item in labels:
        if not unique or item[1] != unique[-1][1]:
            unique.append(item)
    return unique


def country_by_name(table_node) -> dict[str, str]:
    countries: dict[str, str] = {}
    for image in table_node.xpath(".//img[@alt]"):
        cells = image.xpath("ancestor::td[1]")
        if not cells:
            continue
        raw_name = " ".join(cells[0].text_content().split())
        name = clean_name(raw_name)
        country_name = image.get("alt")
        if name and country_name in COUNTRY_CODES:
            countries.setdefault(name, COUNTRY_CODES[country_name])
    return countries


def parse_division(frame: pd.DataFrame, table_node, slug: str, name: str, category: str) -> dict:
    matches = []
    entrants: dict[str, dict] = {}
    countries = country_by_name(table_node)

    for column, round_name in round_columns(frame):
        competitors: list[tuple[str, int]] = []
        previous = None
        for _, row in frame.iloc[1:].iterrows():
            raw_name = row.iloc[column]
            raw_score = row.iloc[column + 1] if column + 1 < len(row) else None
            if pd.isna(raw_name) or pd.isna(raw_score):
                continue
            if not re.search(r"\d+", str(raw_score)):
                continue
            pair = (clean_name(raw_name), score(raw_score))
            if pair != previous:
                competitors.append(pair)
                previous = pair

        if len(competitors) % 2:
            raise ValueError(f"Odd competitor count in {slug} {round_name}: {competitors}")

        for match_index in range(0, len(competitors), 2):
            (a, score_a), (b, score_b) = competitors[match_index:match_index + 2]
            if score_a == score_b:
                raise ValueError(f"Tied bracket score in {slug}: {a} {score_a}-{score_b} {b}")
            for dancer in (a, b):
                entrants.setdefault(dancer, {"stageName": dancer, "countryCode": countries.get(dancer)})
            matches.append({
                "round": round_name,
                "order": match_index // 2 + 1,
                "competitorA": a,
                "competitorB": b,
                "winner": a if score_a > score_b else b,
                "scoreA": score_a,
                "scoreB": score_b,
            })

    final = next(match for match in matches if match["round"] == "final")
    semifinals = [match for match in matches if match["round"] == "semifinal"]
    loser = lambda match: match["competitorB"] if match["winner"] == match["competitorA"] else match["competitorA"]
    placements = [
        {"place": 1, "label": "Winner", "competitor": final["winner"]},
        {"place": 2, "label": "Runner-up", "competitor": loser(final)},
        *({"place": 3, "label": "Semifinalist", "competitor": loser(match)} for match in semifinals),
    ]

    expected_matches = len(entrants) - 1
    if len(matches) != expected_matches:
        raise ValueError(f"{slug}: {len(entrants)} entrants but {len(matches)} matches: {list(entrants)}")

    return {
        "slug": slug,
        "name": name,
        "format": "1v1",
        "category": category,
        "entrants": list(entrants.values()),
        "matches": matches,
        "placements": placements,
    }


def main() -> None:
    request = urllib.request.Request(SOURCE_URL, headers={"User-Agent": "Breakbase/0.1 research import"})
    page = urllib.request.urlopen(request).read().decode("utf-8")
    frames = pd.read_html(io.StringIO(page))
    nodes = html.fromstring(page).xpath("//table")
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    for year, metadata in EDITIONS.items():
        divisions = [
            parse_division(frames[metadata["tables"][0]], nodes[metadata["tables"][0]], "b-boy", "B-Boy World Final", "bboy"),
            parse_division(frames[metadata["tables"][1]], nodes[metadata["tables"][1]], "b-girl", "B-Girl World Final", "bgirl"),
        ]
        archive = {
            "source": {"name": "Wikipedia — Red Bull BC One", "url": SOURCE_URL, "retrievedAt": "2026-07-21"},
            "eventSeries": {"slug": "red-bull-bc-one", "name": "Red Bull BC One"},
            "edition": {
                "slug": f"red-bull-bc-one-{year}", "name": f"Red Bull BC One {year}",
                "startsAt": f'{metadata["date"]}T18:00:00', "timezone": metadata["timezone"],
                "city": metadata["city"], "countryCode": metadata["country"], "status": "completed",
            },
            "staff": {"judges": [], "mcs": [], "djs": []},
            "divisions": divisions,
        }
        destination = OUTPUT_DIR / f"{year}.json"
        destination.write_text(json.dumps(archive, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        summary = ", ".join(f'{division["slug"]}: {len(division["entrants"])} entrants/{len(division["matches"])} matches' for division in divisions)
        print(f"Saved {destination.name} ({summary})")


if __name__ == "__main__":
    main()
