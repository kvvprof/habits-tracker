export type FilterType = {
	id: number;
	name: string;
	active: boolean;
	type: FilterTypeEnum;
};

export enum FilterTypeEnum {
	active = 'active',
	good = 'good',
	bad = 'bad',
	completed = 'completed'
}
