import { ToastType } from '../types/toastType';
import { create } from 'zustand';

type ToastStoreStateType = {
	toast: ToastType | null;
	setToast: (toast: ToastType | null) => void;
};

export const useToastStore = create<ToastStoreStateType>()((set) => ({
	toast: null,

	setToast(toast) {
		set({ toast: toast });
	}
}));
