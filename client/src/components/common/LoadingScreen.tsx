import { ArrowPathIcon } from '@heroicons/react/24/outline';

export const LoadingScreen = () => {
	return (
		<div className='flex h-screen w-full flex-col items-center justify-center bg-gradient-to-r from-[#f3dcf2] via-[#f4e3c8] to-[#f8eaaa] dark:bg-gradient-to-r dark:from-[#575759] dark:to-[#4F4F4F]'>
			<ArrowPathIcon className='h-10 w-10 animate-spin' />
			<p className='mt-2'>Загрузка...</p>
		</div>
	);
};
