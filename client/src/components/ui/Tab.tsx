import { ReactNode } from 'react';

type TabPropsType = {
	children: ReactNode;
	isActive: boolean;
	onClick: () => void;
};

export const Tab = (props: TabPropsType) => {
	const { children, isActive, onClick } = props;

	return (
		<button
			className={`flex w-full items-center justify-center gap-1 rounded-2xl border-2 border-transparent bg-gray-100 p-2 hover:bg-gray-200 dark:bg-c-black ${
				isActive && '!border-c-black hover:bg-gray-100 dark:!border-c-blue'
			}`}
			onClick={onClick}
			disabled={isActive}>
			{children}
		</button>
	);
};
