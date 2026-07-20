export type EventStatus = 'open' | 'invite-only' | 'coming-soon';

export const events = [
	{ name: 'Snipes Battle of the Year', city: 'Berlin', country: 'Germany', date: 'May 24–25', format: 'CREW', status: 'open' as EventStatus },
	{ name: 'Juste Debout 2025', city: 'Paris', country: 'France', date: 'Jun 07', format: '1V1', status: 'open' as EventStatus },
	{ name: 'Red Bull BC One World Final', city: 'Rio de Janeiro', country: 'Brazil', date: 'Jun 29', format: '1V1', status: 'invite-only' as EventStatus },
	{ name: 'Battle King 2025', city: 'Tokyo', country: 'Japan', date: 'Jul 12', format: '1V1', status: 'coming-soon' as EventStatus }
];

export const results = [
	{ date: 'May 18, 2025', event: 'The Notorious IBE', format: '1V1', location: 'Heerlen, NL', winner: 'Lil Zoo', runnerUp: 'Hong 10' },
	{ date: 'May 11, 2025', event: 'King of the Floor', format: '1V1', location: 'Seoul, KR', winner: 'Menno', runnerUp: 'Wing' },
	{ date: 'May 04, 2025', event: 'Breaking for Gold USA', format: 'CREW', location: 'Las Vegas, US', winner: 'Undefeated', runnerUp: 'Found Nation' },
	{ date: 'Apr 27, 2025', event: 'Battle King 2025', format: '1V1', location: 'Tokyo, JP', winner: 'Kairo', runnerUp: 'Ayumi' },
	{ date: 'Apr 20, 2025', event: 'Outbreak Europe', format: 'CREW', location: 'Manchester, UK', winner: 'PowerMove Int.', runnerUp: 'Madrootz' }
];

export const dancers = [
	{ rank: 1, name: 'Victor', country: 'USA', points: 1842 },
	{ rank: 2, name: 'Hong 10', country: 'KOR', points: 1725 },
	{ rank: 3, name: 'Lil Zoo', country: 'USA', points: 1610 },
	{ rank: 4, name: 'Wing', country: 'TPE', points: 1455 },
	{ rank: 5, name: 'Kairo', country: 'JPN', points: 1330 }
];
