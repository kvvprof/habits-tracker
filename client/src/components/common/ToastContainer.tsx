import { useToastStore } from '../../store/useToastStore';
import { Toast } from '../ui/Toast';

export const ToastContainer = () => {
	const toast = useToastStore((state) => state.toast);

	return <>{toast ? <Toast type={toast.type} text={toast.text} /> : <></>}</>;
};
