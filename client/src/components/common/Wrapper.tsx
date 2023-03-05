import { PropsWithChildren, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/useUserStore';

import { LoadingScreen } from './LoadingScreen';

export const Wrapper = (props: PropsWithChildren) => {
	const { children } = props;
	const { isAuthorized, isLoading } = useUserStore();
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthorized && !isLoading && location.pathname !== '/') {
			navigate('/');
		}

		if (isAuthorized && !isLoading && location.pathname === '/') {
			navigate('dashboard');
		}
	}, [isAuthorized, navigate, location.pathname, isLoading]);

	if (isLoading) {
		return <LoadingScreen />;
	}

	return (
		<div className='flex h-screen w-screen justify-center overflow-y-auto bg-gradient-to-r from-[#f3dcf2] via-[#f4e3c8] to-[#f8eaaa] dark:bg-gradient-to-r dark:from-[#575759] dark:to-[#4F4F4F]'>
			<div className='flex h-full w-full max-w-[800px] flex-col justify-between gap-3  p-3'>{children}</div>
		</div>
	);
};
