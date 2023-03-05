import { PropsWithChildren } from 'react';

export const Container = (props: PropsWithChildren) => {
	const { children } = props;

	return (
		<div className='flex h-[calc(100%_-_145px)] min-h-[70px] flex-col overflow-y-auto overflow-x-hidden rounded-2xl bg-c-white p-4 dark:bg-c-gray-5 xs:!h-[calc(100%_-_115px)] sm:h-[calc(100%_-_135px)]'>
			{children}
		</div>
	);
};
