import { XCircleIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react';

type PopUpPropsType = {
	children: ReactNode;
	isActive: boolean;
	onClose: () => void;
};

export const PopUp = (props: PopUpPropsType) => {
	const { children, isActive, onClose } = props;

	return (
		<div
			className={`fixed inset-0 z-10 flex cursor-pointer items-center justify-center overflow-y-auto bg-black-rgba ${
				!isActive && 'hidden'
			}`}
			onClick={onClose}>
			<div className='relative m-5'>
				<div
					className='max-h-[550px] max-w-xl cursor-default overflow-y-auto rounded-2xl bg-c-white p-5 dark:bg-c-gray-5'
					onClick={(event) => {
						event.stopPropagation();
					}}>
					{children}
				</div>

				<XCircleIcon
					className='absolute top-[-18px] right-[-18px] h-6 w-6 cursor-pointer text-white'
					onClick={onClose}
				/>
			</div>
		</div>
	);
};
