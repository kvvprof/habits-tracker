import {
	CheckCircleIcon,
	ExclamationCircleIcon,
	InformationCircleIcon,
	XCircleIcon
} from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { useToastStore } from '../../store/useToastStore';
import { ToastType } from '../../types/toastType';
import { textClipper } from '../../utils/helpers';

type ToastPropsType = ToastType;

export const Toast = (props: ToastPropsType) => {
	const { type, text } = props;
	const setToast = useToastStore((state) => state.setToast);

	useEffect(() => {
		setTimeout(() => {
			setToast(null);
		}, 5000);
	}, [setToast]);

	return (
		<div className='absolute top-3 right-3 z-20 flex h-full max-h-[70px] w-full max-w-[250px] items-center rounded-xl border-[1px] border-c-black bg-c-white p-2 dark:border-c-blue dark:bg-c-gray-5 sm:max-w-[200px]'>
			<button className='absolute top-1 right-1' onClick={() => setToast(null)}>
				<XCircleIcon className='h-4 w-4' />
			</button>

			<div className='flex items-center'>
				{type === 'success' && <CheckCircleIcon className='h-[25px] w-[25px] text-c-green' />}
				{type === 'error' && <ExclamationCircleIcon className='h-[25px] w-[25px] text-c-carrot' />}
				{type === 'info' && <InformationCircleIcon className='h-[25px] w-[25px] text-c-yellow' />}
				<p className='ml-2 !text-sm sm:!text-xs'>{text && textClipper(text, 60)}</p>
			</div>
		</div>
	);
};
