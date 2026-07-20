export type EventStatus = 'open' | 'invite-only' | 'coming-soon';

export type ArchiveResult = {
	date: string;
	event: string;
	format: string;
	location: string;
	winner: string;
	runnerUp: string;
};

export type UpcomingEvent = {
	name: string;
	city: string;
	country: string;
	date: string;
	format: string;
	status: EventStatus;
};

export type DancerSummary = {
	slug: string;
	stageName: string;
	country: string;
	countryCode: string | null;
	crew: string | null;
	appearances: number;
	bestPlacement: number | null;
};

export type DancerRanking = {
	rank: number;
	slug: string;
	stageName: string;
	countryCode: string | null;
	category: string;
	points: number;
	wins: number;
};

export type DancerBattle = {
	date: string;
	event: string;
	round: string;
	opponent: string;
	result: 'win' | 'loss';
	score: string;
};

export type DancerAchievement = {
	code: string;
	title: string;
	event: string;
	tone: 'pink' | 'yellow' | 'blue' | 'lime';
};

export type DancerProfile = {
	slug: string;
	stageName: string;
	country: string;
	countryCode: string | null;
	crew: string | null;
	category: string;
	initials: string;
	wins: number;
	losses: number;
	winRate: number;
	appearances: number;
	bestFinish: string;
	achievements: DancerAchievement[];
	battles: DancerBattle[];
};
