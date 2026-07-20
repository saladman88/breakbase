import postgres from 'postgres';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required');
const sql = postgres(process.env.DATABASE_URL, { max: 1 });

try {
	const editions = await sql`
		select ee.slug,
			count(distinct d.id)::int as dancers,
			count(distinct m.id)::int as matches
		from event_editions ee
		join divisions v on v.event_edition_id = ee.id
		join entries e on e.division_id = v.id
		join entry_members em on em.entry_id = e.id
		join dancers d on d.id = em.dancer_id
		left join matches m on m.division_id = v.id
		where ee.slug like 'red-bull-bc-one-%'
		group by ee.slug
		order by ee.slug
	`;
	const [totals] = await sql`select count(*)::int as dancers from dancers`;
	const duplicateProfiles = await sql`
		select regexp_replace(lower(stage_name), '[^a-z0-9]', '', 'g') as identity_key,
			array_agg(stage_name order by stage_name) as names
		from dancers
		group by 1
		having count(*) > 1
	`;
	console.log(JSON.stringify({ totals, editions, normalizedDuplicateProfiles: duplicateProfiles }, null, 2));
} finally {
	await sql.end();
}
