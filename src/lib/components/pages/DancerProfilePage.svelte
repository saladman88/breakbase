<script lang="ts">
	import PageShell from '../shared/PageShell.svelte';
	import CountryFlag from '../shared/CountryFlag.svelte';
	import type { DancerProfile } from '$lib/types/breakbase';

	const demoProfile: DancerProfile = {
		slug: 'kairo',
		stageName: 'Kairo',
		country: 'Japan',
		countryCode: 'JP',
		crew: null,
		category: 'bboy',
		initials: 'K',
		wins: 8,
		losses: 2,
		winRate: 80,
		appearances: 3,
		bestFinish: 'Champion',
		achievements: [
			{ code: 'W', title: 'Champion', event: 'Battle King 2025', tone: 'pink' },
			{ code: 'F', title: 'World finalist', event: 'BC One', tone: 'yellow' }
		],
		battles: []
	};

	let { profile = demoProfile }: { profile?: DancerProfile } = $props();
	const totalBattles = $derived(profile.wins + profile.losses);
</script>

<PageShell active="dancers">
	<a class="back" href="/dancers">← All dancers</a>
	<section class="profile">
		<div class="identity">
			<span>Dancer profile</span>
			<div class:has-photo={profile.slug === 'hong-10'} class="portrait">
				{#if profile.slug === 'hong-10'}
					<img src="/images/dancers/hong-10/portrait-cutout.webp" alt="Hong 10 performing a freeze" decoding="async" fetchpriority="high" />
				{:else}
					<b>{profile.initials}</b>
				{/if}
				<i>{profile.winRate}%</i>
			</div>
			<p>{profile.category === 'bgirl' ? 'B-Girl' : profile.category === 'bboy' ? 'B-Boy' : 'Breaker'}</p>
			<h1>{profile.stageName}</h1>
			<h2><CountryFlag code={profile.countryCode} country={profile.country} size="md" /> {profile.country}</h2>
			{#if profile.crew}<p class="crew">Represents {profile.crew}</p>{/if}
		</div>

		<div class="career">
			<div class="eyebrow">Battle intelligence</div>
			<div class="stats">
				<div><small>Record</small><strong>{profile.wins}–{profile.losses}</strong></div>
				<div><small>Win rate</small><strong>{profile.winRate}%</strong></div>
				<div><small>Appearances</small><strong>{profile.appearances}</strong></div>
				<div><small>Best finish</small><strong class="finish">{profile.bestFinish}</strong></div>
			</div>

			<div class="pulse">
				<div class="ring" style={`--win-rate: ${profile.winRate * 3.6}deg`}><b>{profile.winRate}%</b><small>battle efficiency</small></div>
				<div class="record">
					<span>Archive sample</span>
					<h3>{totalBattles} documented battles</h3>
					<div class="bar"><i style={`width: ${profile.winRate}%`}></i></div>
					<p>{profile.wins} wins captured across {profile.appearances} world-final appearance{profile.appearances === 1 ? '' : 's'}.</p>
				</div>
			</div>

			<div class="achievements">
				<h3>Achievement wall</h3>
				{#if profile.achievements.length}
					<div class="badges">
						{#each profile.achievements as achievement}
							<div class={achievement.tone}><b>{achievement.code}</b><small>{achievement.title}</small><em>{achievement.event}</em></div>
						{/each}
					</div>
				{:else}
					<p class="empty">First appearance logged. The story starts here.</p>
				{/if}
			</div>
		</div>
	</section>

	<section class="recent">
		<div class="section-head"><div><span>Battle log</span><h3>Road through the bracket</h3></div><b>{totalBattles} battles</b></div>
		{#each profile.battles as battle}
			<div class="result">
				<time>{battle.date}</time>
				<div><strong>{battle.event}</strong><small>{battle.round}</small></div>
				<span>vs {battle.opponent}</span>
				<b class:loss={battle.result === 'loss'}>{battle.result}</b>
				<em>{battle.score}</em>
			</div>
		{/each}
		{#if profile.battles.length === 0}<p class="empty">No individual battles recorded yet.</p>{/if}
	</section>
</PageShell>

<style>
	.back { display: inline-block; margin: 22px 0; color: #98a2a6; font-size: .68rem; font-weight: 800; text-decoration: none; text-transform: uppercase; }
	.profile { display: grid; grid-template-columns: minmax(300px, .78fr) minmax(0, 1.5fr); gap: 24px; }
	.identity, .career, .recent { padding: 24px; border: 1px solid #354047; border-radius: 8px; background: #111617; }
	.identity > span, .eyebrow, .section-head span { padding: 5px 8px; color: #111; background: var(--color-lime); font-size: .62rem; font-weight: 800; text-transform: uppercase; }
	.portrait { position: relative; display: grid; width: 100%; aspect-ratio: 1.2; margin: 20px 0; place-items: center; overflow: hidden; background: linear-gradient(135deg, var(--color-blue), #7448ff); clip-path: polygon(8% 0, 100% 0, 90% 100%, 0 92%); }
	.portrait::after { position: absolute; width: 80%; height: 30%; background: var(--color-pink); clip-path: polygon(0 40%, 100% 0, 70% 100%); content: ''; transform: rotate(-12deg); }
	.portrait b { z-index: 1; color: #111; font-family: 'Archivo Black'; font-size: clamp(7rem, 13vw, 13rem); letter-spacing: -.12em; transform: rotate(-10deg); }
	.portrait img { position: relative; z-index: 2; width: 96%; height: 96%; object-fit: contain; filter: drop-shadow(0 16px 18px rgba(0,0,0,.48)); }
	.portrait.has-photo { background: linear-gradient(135deg, #10191f, var(--color-blue)); }
	.portrait.has-photo img { transform: translateY(-8%); }
	.portrait.has-photo::after { z-index: 1; opacity: .9; }
	.portrait i { position: absolute; right: 18px; bottom: 25px; z-index: 2; padding: 8px; color: #111; background: var(--color-lime); font-family: 'Archivo Black'; font-size: .8rem; font-style: normal; }
	.identity p { margin: 0; color: #9ca6aa; font-size: .72rem; text-transform: uppercase; }
	h1 { margin: 2px 0; overflow-wrap: anywhere; font-size: clamp(3.7rem, 7vw, 7rem); line-height: .82; }
	h2 { display: flex; align-items: center; gap: 9px; margin: 12px 0; font-family: 'Space Grotesk'; font-size: .9rem; letter-spacing: .1em; text-transform: uppercase; }
	.crew { margin-top: 16px !important; padding-top: 14px; border-top: 1px solid #354047; color: var(--color-yellow) !important; }
	.stats { display: grid; grid-template-columns: repeat(4, 1fr); margin: 18px 0 28px; border-block: 1px solid #354047; }
	.stats div { min-width: 0; padding: 16px 12px; border-right: 1px solid #354047; }
	.stats div:last-child { border: 0; }
	.stats small { display: block; color: #899398; font-size: .55rem; text-transform: uppercase; }
	.stats strong { display: block; margin-top: 6px; color: var(--color-lime); font-family: 'Archivo Black'; font-size: 1.45rem; }
	.stats .finish { color: var(--color-yellow); font-size: 1rem; }
	.pulse { display: grid; grid-template-columns: 210px 1fr; align-items: center; gap: 28px; padding: 20px; border: 1px solid #303a3f; background: #0e1314; }
	.ring { display: grid; width: 180px; aspect-ratio: 1; place-content: center; border-radius: 50%; background: radial-gradient(circle at center, #111617 59%, transparent 60%), conic-gradient(var(--color-lime) var(--win-rate), #2b3438 0); text-align: center; }
	.ring b { font-family: 'Archivo Black'; font-size: 2rem; }.ring small { color: #899398; font-size: .52rem; text-transform: uppercase; }
	.record span { color: var(--color-pink); font-size: .58rem; font-weight: 800; text-transform: uppercase; }.record h3 { margin: 8px 0; font-size: 1.35rem; }.record p { color: #929da2; font-size: .72rem; line-height: 1.5; }
	.bar { height: 8px; overflow: hidden; background: #293236; }.bar i { display: block; height: 100%; background: linear-gradient(90deg, var(--color-blue), var(--color-lime)); }
	.achievements { margin-top: 28px; }.achievements h3 { margin: 0 0 14px; }
	.badges { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
	.badges > div { display: grid; min-height: 145px; padding: 16px 10px; place-content: center; border: 2px solid currentColor; border-radius: 50%; text-align: center; }
	.badges b { font-family: 'Archivo Black'; font-size: 1.6rem; }.badges small { font-size: .58rem; font-weight: 800; text-transform: uppercase; }.badges em { max-width: 13ch; margin-top: 5px; font-size: .48rem; font-style: normal; opacity: .7; }
	.pink { color: var(--color-pink); }.yellow { color: var(--color-yellow); }.blue { color: var(--color-blue); }.lime { color: var(--color-lime); }
	.recent { margin-top: 24px; }.section-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }.section-head h3 { margin: 10px 0 0; font-size: 1.4rem; }.section-head > b { color: #899398; font-size: .65rem; text-transform: uppercase; }
	.result { display: grid; grid-template-columns: 125px 1.5fr 1fr 70px 44px; align-items: center; gap: 14px; padding: 15px 5px; border-top: 1px solid #303a3f; font-size: .7rem; }
	.result div { display: grid; gap: 4px; }.result strong { text-transform: uppercase; }.result small, time, .result span { color: #8c969a; }.result small { text-transform: capitalize; }.result > b { color: var(--color-lime); text-transform: uppercase; }.result > b.loss { color: var(--color-pink); }.result em { color: var(--color-yellow); font-family: 'Archivo Black'; font-style: normal; }
	.empty { padding: 26px; color: #7f898d; border: 1px dashed #354047; text-align: center; text-transform: uppercase; }
	@media (max-width: 900px) { .profile { grid-template-columns: 1fr; } .portrait { max-height: 390px; } }
	@media (max-width: 650px) { .stats { grid-template-columns: 1fr 1fr; }.stats div:nth-child(2) { border-right: 0; }.pulse { grid-template-columns: 1fr; justify-items: center; }.badges { grid-template-columns: repeat(2, 1fr); }.result { grid-template-columns: 90px 1fr auto; }.result > span, .result > em { display: none; } }
</style>
