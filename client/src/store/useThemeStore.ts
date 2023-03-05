import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeStoreStateType = {
	isDarkMode: boolean;
	setTheme: (isDarkMode: boolean) => void;
};

const getInitialTheme = (): boolean => {
	if (typeof window !== 'undefined') {
		const themeState = localStorage.themeState;

		if (themeState) {
			return JSON.parse(themeState).state.isDarkMode;
		}
	}

	return false;
};

export const useThemeStore = create<ThemeStoreStateType>()(
	persist(
		(set) => ({
			isDarkMode: getInitialTheme(),

			setTheme: (isDarkMode) => {
				set({ isDarkMode: isDarkMode });
			}
		}),
		{
			name: 'themeState'
		}
	)
);
