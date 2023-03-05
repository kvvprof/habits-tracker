import { ArrowSmallRightIcon, HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useToastStore } from '../store/useToastStore';
import { HabitType, HabitTypeEnum } from '../types/habitType';
import { numberToArray, textClipper } from '../utils/helpers';
import { extend } from '../utils/kyConfig';
import { ContentLoader } from './common/ContentLoader';
import { NoContent } from './common/NoContent';
import { Title } from './common/Title';
import { Button } from './ui/Button';
import { PopUp } from './ui/PopUp';

type PopUpContentPropsType = HabitType;

const PopUpContent = (props: PopUpContentPropsType) => {
	const { title, description, duration, startLives } = props;
	const navigate = useNavigate();

	return (
		<div className='flex h-full flex-col dark:bg-c-gray-5'>
			<div className='flex flex-1 flex-col gap-4'>
				<h2>{title}</h2>

				<div className='flex-1'>
					<p>{description}</p>
				</div>

				<div className='flex flex-col gap-1'>
					<p className='font-bold'>Продолжительность: {duration} дн.</p>
					<div className='flex items-center'>
						<p className='font-bold'>Жизни: </p>
						{numberToArray(startLives).map((heart) => (
							<HeartIcon className='h-[20px] w-[20px] text-c-carrot' key={heart} />
						))}
					</div>
				</div>

				<Button onClick={() => navigate('/create', { state: { ...props } })}>Выбрать</Button>
			</div>
		</div>
	);
};

type CardPropsType = HabitType;

const Card = (props: CardPropsType) => {
	const { title } = props;
	const [activePopUp, setActivePopUp] = useState<boolean>(false);

	return (
		<>
			<div className='flex h-[180px] w-full flex-col justify-between gap-2 rounded-2xl bg-c-gray p-4 dark:bg-c-black xs:h-[130px]'>
				<p className='flex-1'>{textClipper(title, 60)}</p>
				<Button onClick={() => setActivePopUp(true)}>
					<span>Подробнее</span>
					<ArrowSmallRightIcon className='h-[15px] w-[15px]' />
				</Button>
			</div>

			<PopUp isActive={activePopUp} onClose={() => setActivePopUp(false)}>
				<PopUpContent {...props} />
			</PopUp>
		</>
	);
};

export const Catalog = () => {
	const setToast = useToastStore((state) => state.setToast);

	const { data, isFetching, isError } = useQuery({
		queryKey: ['habits'],
		queryFn: async (): Promise<HabitType[]> => {
			return await extend.get('habits').json();
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
		<div className='flex flex-col gap-6'>
			<Title text='Каталог' />

			<div className='flex flex-col gap-3'>
				<div className='flex items-center gap-1'>
					<HandThumbUpIcon className='h-[20px] w-[20px]' />
					<h2>Приобрести полезную привычку</h2>
				</div>

				<div className='grid grid-cols-3 gap-3 xs:!grid-cols-1 sm:grid-cols-2'>
					{data?.map((habit) => habit.type === HabitTypeEnum.good && <Card key={habit.id} {...habit} />)}
				</div>
			</div>

			<div className='flex flex-col gap-3'>
				<div className='flex items-center gap-1'>
					<HandThumbDownIcon className='h-[20px] w-[20px]' />
					<h2>Убрать вредную привычку</h2>
				</div>

				<div className='grid grid-cols-3 gap-3 xs:!grid-cols-1 sm:grid-cols-2'>
					{data?.map((habit) => habit.type === 'bad' && <Card key={habit.id} {...habit} />)}
				</div>
			</div>
		</div>
	);
};
