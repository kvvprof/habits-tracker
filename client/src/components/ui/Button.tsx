import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react';

type ButtonPropsType = {
	disabled?: boolean;
	isLoading?: boolean;
	children?: ReactNode;
	className?: string;
	onClick?: () => void;
};

export const Button = (props: ButtonPropsType) => {
	const { disabled = false, isLoading = false, children, className, onClick } = props;

	return (
		<button
			className={`relative flex items-center justify-center gap-1 rounded-2xl bg-gradient-to-r from-[#96e9fc] via-[#cadefc] to-[#f3dcfc] p-3 hover:opacity-80 dark:bg-gradient-to-r dark:from-[#4446F5] dark:to-[#4446F5] xs:p-2 ${className} ${
				disabled && '!hover:opacity-60 !opacity-60'
			}`}
			type='submit'
			disabled={disabled}
			onClick={onClick}>
			{isLoading ? <ArrowPathIcon className='h-6 w-6 animate-spin xs:h-[18px] xs:w-[18px]' /> : children}
		</button>
	);
};
