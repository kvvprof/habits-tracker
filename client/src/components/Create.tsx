import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToastStore } from '../store/useToastStore';
import { HabitType, HabitTypeEnum } from '../types/habitType';
import { CreateUserHabitType, UserHabitStatusEnum, UserHabitType } from '../types/userHabitType';
import { extend } from '../utils/kyConfig';
import { Title } from './common/Title';
import { Button } from './ui/Button';

export const Create = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const props: HabitType | null = location.state;
	const setToast = useToastStore((state) => state.setToast);
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<CreateUserHabitType>();

	const createHabit = useMutation({
		mutationFn: async (data: CreateUserHabitType): Promise<UserHabitType> => {
			return await extend
				.post('user-habits/habit/create', {
					json: data
				})
				.json();
		},
		onSuccess(data) {
			navigate(`/habit/${data.id}`);
		},
		onError() {
			setToast({ type: 'error', text: 'Не удалось создать привычку' });
		}
	});

	const onSubmit: SubmitHandler<CreateUserHabitType> = (data) => {
		createHabit.mutate({
			...data,
			duration: +data.duration,
			startLives: +data.startLives,
			status: UserHabitStatusEnum.progress
		});
	};

	return (
		<>
			<div className='flex flex-1 flex-col gap-4'>
				<div className='flex items-center justify-between'>
					<Title text='Создать'>
						<Button className='text-xs' onClick={() => navigate('/catalog')} disabled={createHabit.isLoading}>
							Каталог
						</Button>
					</Title>
				</div>

				<form className='flex w-full flex-1 flex-col gap-3 sm:!gap-1' onSubmit={handleSubmit(onSubmit)}>
					<div className='flex flex-col gap-2'>
						<h3>Ваша цель</h3>
						<div className='flex gap-2 sm:flex-col'>
							<label
								className={`app-input flex w-full cursor-pointer items-center gap-1 ${errors.type && '!bg-c-pink'}`}
								htmlFor='good'>
								<input
									{...register('type', { required: true })}
									type='radio'
									value='good'
									id='good'
									defaultChecked={props?.type === HabitTypeEnum.good}
								/>
								<p>Приобрести полезную привычку</p>
							</label>

							<label
								className={`app-input flex w-full cursor-pointer items-center gap-1 ${errors.type && '!bg-c-pink'}`}
								htmlFor='bad'>
								<input
									{...register('type', { required: true })}
									type='radio'
									value='bad'
									id='bad'
									defaultChecked={props?.type === HabitTypeEnum.bad}
								/>
								<p>Убрать вредную привычку</p>
							</label>
						</div>
					</div>

					<div className='flex flex-1 flex-col gap-2'>
						<h3>Название и описание</h3>
						<div className='flex flex-col'>
							<input
								className={`app-input ${errors.title && '!bg-c-pink'}`}
								{...register('title', { required: true })}
								placeholder='Название'
								type='text'
								maxLength={55}
								defaultValue={props?.title}
							/>
							<p className='text-right text-xs sm:text-[10px]'> макс: 55</p>
						</div>
						<div className='flex flex-1 flex-col'>
							<textarea
								className='app-input flex-1 resize-none'
								{...register('description')}
								placeholder='Описание (необязательно)'
								maxLength={1000}
								defaultValue={props?.description}
							/>
							<p className='text-right text-xs sm:text-[10px]'> макс: 1 000</p>
						</div>
					</div>

					<div className='flex flex-col gap-2'>
						<h3>Продолжительность и жизни</h3>
						<div className='flex gap-2'>
							<div className='flex items-center gap-2'>
								<div className='flex flex-col items-center gap-1'>
									<input
										className={`app-input w-28 sm:w-20 ${errors.duration && '!bg-c-pink'}`}
										{...register('duration', {
											required: true,
											pattern: {
												value: /^[0-9]+$/,
												message: ''
											}
										})}
										type='number'
										min={1}
										max={365}
										defaultValue={props?.duration || 60}
									/>
									<p className='text-xs sm:text-[10px]'> 🕔 макс: 365 дн.</p>
								</div>
							</div>

							<div className='flex items-center gap-2'>
								<div className='flex flex-col items-center gap-1'>
									<input
										className={`app-input w-28 sm:w-20 ${errors.startLives && '!bg-c-pink'}`}
										{...register('startLives', {
											required: true,
											pattern: {
												value: /^[0-9]+$/,
												message: ''
											}
										})}
										type='number'
										min={1}
										max={5}
										defaultValue={props?.startLives || 3}
									/>
									<p className='text-xs sm:text-[10px]'>❤️ макс: 5</p>
								</div>
							</div>
						</div>
					</div>
					<Button disabled={createHabit.isLoading} isLoading={createHabit.isLoading}>
						Создать
					</Button>
				</form>
			</div>
		</>
	);
};
