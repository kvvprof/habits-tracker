import { UserHabitStatusEnum } from '../types/userHabitType';

export const parseDate = (timestamp: Date): string => {
	const date = new Date(timestamp);
	const day = date.getDate();
	const month = +date.getMonth() + 1;
	const getFullYear = date.getFullYear();

	return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${getFullYear.toString().slice(2)}`;
};

export const getProgress = (
	createdAt: Date | undefined,
	updatedAt: Date | undefined,
	duration: number | undefined,
	status: UserHabitStatusEnum | undefined
): { days: number; progress: number } => {
	if (!createdAt || !updatedAt || !duration || !status) {
		return { days: 0, progress: 0 };
	}

	const timestamp_1: number = +new Date(createdAt);
	const timestamp_2: number = status === UserHabitStatusEnum.fail ? +new Date(updatedAt) : Date.now();

	const days: number = Math.round((timestamp_2 - timestamp_1) / (1000 * 60 * 60 * 24));
	const progress: number = Math.round((days / duration) * 100);

	if (days > duration) {
		return { days: duration, progress: 100 };
	} else {
		return { days: days, progress: progress };
	}
};

export const getPartOfTheDay = (): string => {
	const date = new Date();
	const hours = date.getHours();

	if (hours > 5 && hours < 12) {
		return 'утро';
	}

	if (hours > 11 && hours < 18) {
		return 'день';
	}

	if (hours > 17 && hours <= 23) {
		return 'вечер';
	}

	if (hours >= 0 && hours < 6) {
		return 'ночь';
	}

	return 'день';
};

export const numberToArray = (lives: number): number[] => {
	const array = [];

	for (let index = 0; index < lives; index++) {
		array.push(index);
	}

	return array;
};

export const textClipper = (text: string, value: number): string => {
	if (text.length <= value) {
		return text;
	} else return text.slice(0, value) + '...';
};

export const parseUserHabitStatus = (status: string): string => {
	switch (status) {
		case 'progress':
			return 'активна';
		case 'fail':
			return 'неудачно';
		case 'success':
			return 'успешно';
		default:
			return '';
	}
};

export const parseErrorMessage = (message: string): string => {
	switch (message) {
		case 'The user is already registered':
			return 'Пользователь с такой почтой уже зарегистрирован';

		case 'The user is not registered':
			return 'Пользователь с такой почтой не зарегистрирован';

		case 'Invalid password':
			return 'Неверный пароль';

		default:
			return 'Произошла ошибка. Попробуйте позже';
	}
};

export const setStatusColor = (status: UserHabitStatusEnum): string => {
	switch (status) {
		case UserHabitStatusEnum.progress:
			return 'border-c-yellow';

		case UserHabitStatusEnum.success:
			return 'border-c-green';

		case UserHabitStatusEnum.fail:
			return 'border-c-carrot';

		default:
			return 'border-c-white';
	}
};
