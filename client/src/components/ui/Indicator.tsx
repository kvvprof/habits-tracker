export const Indicator = () => {
	return (
		<span className='absolute top-[1px] right-[1px] flex h-[10px] w-[10px]'>
			<span className='bg-c-green absolute inline-flex h-full w-full animate-ping rounded-full opacity-75'></span>
			<span className='bg-c-green relative inline-flex h-[10px] w-[10px] rounded-full'></span>
		</span>
	);
};
