import { HeartIcon } from '@heroicons/react/24/solid';
import {
	ArchiveBoxIcon,
	ArrowRightIcon,
	HandThumbDownIcon,
	HandThumbUpIcon,
	HeartIcon as HeartIconOutline,
	RocketLaunchIcon
} from '@heroicons/react/24/outline';
import { HabitTypeEnum } from '../types/habitType';
import { UserHabitStatusEnum, UserHabitType } from '../types/userHabitType';
import { getProgress, numberToArray, parseDate, parseUserHabitStatus, setStatusColor } from '../utils/helpers';
import { CircleProgressBar } from './ui/CircleProgressBar';
import { Button } from './ui/Button';
import { Indicator } from './ui/Indicator';
import { useMemo, useState } from 'react';
import { FilterType, FilterTypeEnum } from '../types/filterType';
import { useQuery } from 'react-query';
import { extend } from '../utils/kyConfig';
import { ContentLoader } from './common/ContentLoader';
import { NoContent } from './common/NoContent';
import { Tab } from './ui/Tab';
import { useNavigate } from 'react-router-dom';
import { useToastStore } from '../store/useToastStore';
import { useMediaQuery } from '../hooks/useMediaQuery';

type CardPropsType = UserHabitType;

const Card = (props: CardPropsType) => {
	const { title, duration, createdAt, startLives, spentLives, status, id, updatedAt } = props;
	const navigate = useNavigate();
	const matches = useMediaQuery('(max-width: 576px)');

	const { days, progress } = useMemo(
		() => getProgress(status !== UserHabitStatusEnum.progress ? updatedAt : Date.now(), createdAt, duration),
		[createdAt, duration, status, updatedAt]
	);

	return (
		<div className='box flex gap-2 sm:gap-1 md:!p-2'>
			<CircleProgressBar
				size={matches ? 60 : 90}
				trackWidth={matches ? 5 : 7}
				indicatorWidth={matches ? 5 : 7}
				progress={progress}
				fontsize={matches ? '10px' : '16px'}
			/>

			<div className='flex w-full flex-col gap-3'>
				<h2 className='xs:!text-[10px] xs:!leading-[14px] sm:text-[14px] sm:leading-[18px]'>{title}</h2>

				<div className='flex items-center gap-2 md:!hidden'>
					<p className={`${setStatusColor(status)} rounded-2xl border-2 bg-white p-[6px] dark:bg-c-gray-5`}>
						{parseUserHabitStatus(status)}
					</p>

					<p className='box-2 !p-2'>🕒 {parseDate(createdAt)}</p>

					<p className='box-2 !p-2'>
						🗓 {days}/ {duration} дн.
					</p>

					<div className='box-2 flex items-center justify-center !p-2'>
						{numberToArray(startLives - spentLives).map((heart) => (
							<HeartIcon className='h-[20px] w-[20px] text-c-carrot' key={heart} />
						))}
						{numberToArray(spentLives).map((heart) => (
							<HeartIconOutline className='h-[20px] w-[20px] text-c-carrot' key={heart} />
						))}
					</div>
				</div>
			</div>

			<Button onClick={() => navigate(`/habit/${id}`)}>
				<ArrowRightIcon className='h-5 w-5 sm:h-3 sm:w-3' />
				{days === duration && status === UserHabitStatusEnum.progress && <Indicator />}
			</Button>
		</div>
	);
};

export const Dashboard = () => {
	const setToast = useToastStore((state) => state.setToast);
	const [filters, setFilters] = useState<FilterType[]>([
		{ id: 1, name: 'Активные', type: FilterTypeEnum.active, active: true },
		{ id: 2, name: 'Полезные', type: FilterTypeEnum.good, active: false },
		{ id: 3, name: 'Вредные', type: FilterTypeEnum.bad, active: false },
		{ id: 4, name: 'Архив', type: FilterTypeEnum.completed, active: false }
	]);

	const switchFilterHandler = (filter: FilterType) => {
		setFilters((state) =>
			state.map((el) => (filter.id === el.id ? { ...el, active: true } : { ...el, active: false }))
		);
	};

	const getCurrentActiveFilter = (): FilterTypeEnum | null => {
		let activeFilter: FilterTypeEnum | null = null;

		filters.forEach((filter) => {
			if (filter.active) {
				activeFilter = filter.type;
			}
		});

		return activeFilter;
	};

	const showHabits = () => {
		switch (getCurrentActiveFilter()) {
			case FilterTypeEnum.active:
				return data?.map(
					(userHabit) => userHabit.status === UserHabitStatusEnum.progress && <Card key={userHabit.id} {...userHabit} />
				);

			case FilterTypeEnum.good:
				return data?.map(
					(userHabit) =>
						userHabit.type === HabitTypeEnum.good &&
						userHabit.status === UserHabitStatusEnum.progress && <Card key={userHabit.id} {...userHabit} />
				);

			case FilterTypeEnum.bad:
				return data?.map(
					(userHabit) =>
						userHabit.type === HabitTypeEnum.bad &&
						userHabit.status === UserHabitStatusEnum.progress && <Card key={userHabit.id} {...userHabit} />
				);

			case FilterTypeEnum.completed:
				return data?.map(
					(userHabit) => userHabit.status !== UserHabitStatusEnum.progress && <Card key={userHabit.id} {...userHabit} />
				);

			default:
				return <NoContent />;
		}
	};

	const { data, isFetching, isError } = useQuery({
		queryKey: ['userHabits'],
		queryFn: async (): Promise<UserHabitType[]> => {
			return await extend.get(`user-habits`).json();
		},
		onError() {
			setToast({ type: 'error', text: 'Не удалось загрузить данные' });
		}
	});

	if (isFetching) {
		return <ContentLoader />;
	}

	if (isError) {
		return <NoContent />;
	}

	return (
		<div className='relative flex h-full flex-col gap-3'>
			<div className='grid w-full grid-cols-4 gap-2 dark:bg-c-gray-5 sm:grid-cols-2'>
				{filters.map((filter) => (
					<div className='h-[44px] w-full' key={filter.id}>
						<Tab isActive={filter.active} onClick={() => switchFilterHandler(filter)}>
							{filter.type === FilterTypeEnum.active && <RocketLaunchIcon className='h-[15px] w-[15px]' />}
							{filter.type === FilterTypeEnum.good && <HandThumbUpIcon className='h-[15px] w-[15px]' />}
							{filter.type === FilterTypeEnum.bad && <HandThumbDownIcon className='h-[15px] w-[15px]' />}
							{filter.type === FilterTypeEnum.completed && <ArchiveBoxIcon className='h-[15px] w-[15px]' />}
							<span>{filter.name}</span>
						</Tab>
					</div>
				))}
			</div>

			{data?.length ? (
				<div className='flex w-full flex-col gap-3 rounded-2xl dark:bg-c-gray-5'>{showHabits()}</div>
			) : (
				<div className='flex flex-1 flex-col items-center justify-center'>
					<h1>У вас пока нет привычек</h1>
				</div>
			)}
		</div>
	);
};
