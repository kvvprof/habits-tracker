import { HeartIcon } from '@heroicons/react/24/solid';
import { TrashIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconOutline, PencilSquareIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useMemo, useState } from 'react';
import { UpdateUserHabitType, UserHabitStatusEnum, UserHabitType } from '../types/userHabitType';
import { useMutation, useQuery } from 'react-query';
import { extend } from '../utils/kyConfig';
import { ContentLoader } from './common/ContentLoader';
import { NoContent } from './common/NoContent';
import { Alert } from './ui/Alert';
import { Button } from './ui/Button';
import { getProgress, numberToArray, parseDate, parseUserHabitStatus, setStatusColor } from '../utils/helpers';
import { CircleProgressBar } from './ui/CircleProgressBar';
import { Indicator } from './ui/Indicator';
import { useNavigate, useParams } from 'react-router-dom';
import { Title } from './common/Title';
import { useToastStore } from '../store/useToastStore';
import { useMediaQuery } from '../hooks/useMediaQuery';

export const Details = () => {
	const [userHabitState, setUserHabitState] = useState<UserHabitType | null>(null);
	const [alert, setAlert] = useState<{ message: string; onAccept: () => void } | null>(null);
	const { id } = useParams();
	const navigate = useNavigate();
	const setToast = useToastStore((state) => state.setToast);
	const matches = useMediaQuery('(max-width: 576px)');

	const { days, progress } = useMemo(
		() =>
			getProgress(
				userHabitState?.createdAt,
				userHabitState?.updatedAt,
				userHabitState?.duration,
				userHabitState?.status
			),
		[userHabitState?.status, userHabitState?.updatedAt, userHabitState?.createdAt, userHabitState?.duration]
	);

	const getUserHabit = useQuery({
		queryKey: ['getUserHabit'],
		queryFn: async (): Promise<UserHabitType> => {
			return await extend.get(`user-habits/habit/${id}`).json();
		},
		onSuccess(data) {
			setUserHabitState(data);
		},
		onError() {
			setToast({ type: 'error', text: 'Не удалось загрузить данные' });
		}
	});

	const updateUserHabit = useMutation({
		mutationFn: async (data: UpdateUserHabitType): Promise<UserHabitType> => {
			return await extend
				.put('user-habits/habit/update', {
					json: data
				})
				.json();
		},
		onSuccess(data) {
			setUserHabitState(data);
		},
		onError() {
			setToast({ type: 'error', text: 'Не удалось обновить привычку' });
		}
	});

	const deleteUserHabit = useMutation({
		mutationFn: async (): Promise<UserHabitType> => {
			return await extend.delete(`user-habits/habit/delete/${id}`).json();
		},
		onSuccess() {
			navigate('/dashboard');
		},
		onError() {
			setToast({ type: 'error', text: 'Не удалось удалить привычку' });
		}
	});

	const decreaseUserHabitLivesHandler = () => {
		if (userHabitState) {
			if (userHabitState.spentLives >= userHabitState.startLives) {
				setAlert({
					message: 'У вас не осталось жизней. Если вы нажмете "Да", то привычка завершится со статусом "Неудачно"',
					onAccept: () => {
						updateUserHabit.mutate({ id: userHabitState.id, status: UserHabitStatusEnum.fail });
						setAlert(null);
					}
				});
			} else {
				setAlert({
					message: 'Будет списана одна жизнь. Вы уверены?',
					onAccept: () => {
						updateUserHabit.mutate({ id: userHabitState.id, spentLives: userHabitState.spentLives + 1 });
						setAlert(null);
					}
				});
			}
		}
	};

	const completeUserHabitHandler = () => {
		if (userHabitState) {
			setAlert({
				message: 'Привычка будет завершена. Вы уверены?',
				onAccept: () => {
					updateUserHabit.mutate({ id: userHabitState.id, status: UserHabitStatusEnum.success });
					setAlert(null);
				}
			});
		}
	};

	const deleteUserHabitHandler = () => {
		if (userHabitState) {
			setAlert({
				message: 'Все данные будут удалены. Вы уверены?',
				onAccept: () => {
					deleteUserHabit.mutate();
					setAlert(null);
				}
			});
		}
	};

	if (getUserHabit.isFetching || deleteUserHabit.isLoading || updateUserHabit.isLoading) {
		return <ContentLoader />;
	}

	if (getUserHabit.isError || deleteUserHabit.isError || updateUserHabit.isError) {
		return (
			<>
				<NoContent />
			</>
		);
	}

	return (
		<>
			{alert && (
				<Alert isActive={true} message={alert.message} onAccept={alert.onAccept} onClose={() => setAlert(null)} />
			)}

			{userHabitState && (
				<div className='relative flex h-full flex-col gap-3 overflow-x-hidden'>
					<Title text={userHabitState.title}>
						<Button onClick={deleteUserHabitHandler}>
							<TrashIcon className='h-[15px] w-[15px]' />
						</Button>
					</Title>

					<div className='mt-2 grid grid-cols-3 gap-3 sm:grid-cols-2'>
						<div className='flex flex-col gap-3'>
							<div className='box'>
								<p className='box-2'>
									🗓 {days}/{userHabitState.duration}
								</p>
							</div>

							<div className='box'>
								<div className='box-2 flex'>
									{numberToArray(userHabitState.startLives - userHabitState.spentLives).map((heart) => (
										<HeartIcon className='h-[25px] w-[25px] text-c-carrot sm:h-[15px] sm:w-[15px]' key={heart} />
									))}
									{numberToArray(userHabitState.spentLives).map((heart) => (
										<HeartIconOutline className='h-[25px] w-[25px] text-c-carrot sm:h-[15px] sm:w-[15px]' key={heart} />
									))}
								</div>
							</div>
						</div>

						<div className='box'>
							<CircleProgressBar
								size={matches ? 100 : 140}
								trackWidth={9}
								indicatorWidth={9}
								progress={progress}
								fontsize={matches ? '14px' : '20px'}
							/>
						</div>

						<div className='flex flex-col gap-3 sm:col-span-2 sm:flex-row'>
							<div className='box'>
								<div className='box-2 flex items-center gap-1'>
									<span>🕒 </span>
									<p>{parseDate(userHabitState.createdAt)}</p>
								</div>
							</div>

							<div className='box'>
								<div className='flex items-center gap-1'>
									<p className={`${setStatusColor(userHabitState.status)} rounded-2xl border-4 p-2 sm:border-2`}>
										{parseUserHabitStatus(userHabitState.status)}
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className='h-full min-h-[70px] flex-1 overflow-auto rounded-2xl bg-c-gray p-4 dark:bg-c-black'>
						<p>{userHabitState.description ? userHabitState.description : 'Описание отсутствует'}</p>
					</div>

					{userHabitState.status === UserHabitStatusEnum.progress && (
						<div className='flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-center'>
							<Button className='w-full' onClick={decreaseUserHabitLivesHandler}>
								<HeartIconOutline className='h-[15px] w-[15px]' />
								<span className='sm:hidden'>Потратить жизнь</span>
							</Button>

							<Button className='w-full' onClick={() => navigate('/update', { state: { ...userHabitState } })}>
								<PencilSquareIcon className='h-[15px] w-[15px]' />
								<span className='sm:hidden'>Редактировать</span>
							</Button>

							<Button className='w-full' onClick={completeUserHabitHandler} disabled={userHabitState.duration > days}>
								<CheckCircleIcon className='h-[15px] w-[15px]' />

								<span className='sm:hidden'>Завершить</span>

								<span className='text-xs sm:hidden'>
									{userHabitState.duration > days && `| осталось ${userHabitState.duration - days} дн.`}
								</span>

								{days === userHabitState.duration && userHabitState.status === UserHabitStatusEnum.progress && (
									<Indicator />
								)}
							</Button>
						</div>
					)}
				</div>
			)}
		</>
	);
};
