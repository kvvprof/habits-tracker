import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

type TitlePropsType = {
	text: string;
	children?: ReactNode;
};

export const Title = (props: TitlePropsType) => {
	const { text, children } = props;
	const navigate = useNavigate();

	return (
		<div className='flex w-full items-center justify-between gap-3'>
			<div className='flex items-center gap-3'>
				<Button onClick={() => navigate(-1)}>
					<ArrowLeftIcon className='h-[16px] w-[16px] sm:h-[14px] sm:w-[14px]' />
				</Button>

				<h1>{text}</h1>
			</div>

			{children}
		</div>
	);
};
