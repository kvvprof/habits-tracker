export enum HabitTypeEnum {
	good = 'good',
	bad = 'bad'
}

export type HabitType = {
	id: number;
	title: string;
	description: string;
	type: HabitTypeEnum;
	duration: number;
	startLives: number;
	createdAt: Date;
};
