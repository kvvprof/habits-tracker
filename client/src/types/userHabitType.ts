import { HabitTypeEnum } from './habitType';

export enum UserHabitStatusEnum {
	progress = 'progress',
	success = 'success',
	fail = 'fail'
}

export type UserHabitType = {
	id: number;
	title: string;
	description: string;
	type: HabitTypeEnum;
	duration: number;
	startLives: number;
	spentLives: number;
	status: UserHabitStatusEnum;
	createdAt: Date;
	updatedAt: Date;
	userId: number;
};

export type CreateUserHabitType = {
	title: string;
	description?: string;
	type: HabitTypeEnum;
	duration: number;
	startLives: number;
	status: UserHabitStatusEnum;
};

export type UpdateUserHabitType = {
	id: number;
	title?: string;
	description?: string;
	type?: HabitTypeEnum;
	duration?: number;
	startLives?: number;
	spentLives?: number;
	status?: UserHabitStatusEnum;
	createdAt?: Date;
	updatedAt?: Date;
	userId?: number;
};
