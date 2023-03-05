import { UserType } from '../types/userType';
import { create } from 'zustand';

type UserStoreStateType = {
	user: UserType | null;
	isAuthorized: boolean;
	isLoading: boolean;
	setUser: (data: UserType | null) => void;
	setIsAuthorized: (isAuthorized: boolean) => void;
	setIsLoading: (isLoading: boolean) => void;
};

export const useUserStore = create<UserStoreStateType>()((set) => ({
	user: null,
	isAuthorized: false,
	isLoading: true,

	setUser: (data) => {
		set({ user: data });
	},

	setIsAuthorized: (isAuthorized) => {
		set({ isAuthorized: isAuthorized });
	},

	setIsLoading: (isLoading) => {
		set({ isLoading: isLoading });
	}
}));
