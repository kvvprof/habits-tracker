import { ArrowPathIcon } from '@heroicons/react/24/outline';

export const ContentLoader = () => {
	return (
		<div className='flex h-full w-full flex-col items-center justify-center'>
			<ArrowPathIcon className='h-6 w-6 animate-spin' />
			<p>Загрузка...</p>
		</div>
	);
};
