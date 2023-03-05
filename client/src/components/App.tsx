import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useThemeStore } from '../store/useThemeStore';
import { useUserStore } from '../store/useUserStore';
import { UserType } from '../types/userType';
import { original } from '../utils/kyConfig';
import { Router } from './common/Router';

export const App = () => {
	const isDarkMode = useThemeStore((state) => state.isDarkMode);
	const { setUser, user, setIsAuthorized, setIsLoading } = useUserStore();

	const getUser = useMutation({
		mutationFn: async (): Promise<UserType> => {
			return await original
				.get('user/refresh-session', {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`
					}
				})
				.json();
		},
		onSuccess(data) {
			setUser(data);
			setIsAuthorized(true);
			setIsLoading(false);
		},
		onError() {
			setIsLoading(false);
		}
	});

	useEffect(() => {
		if (!user) {
			getUser.mutate();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [isDarkMode]);

	return <Router />;
};
