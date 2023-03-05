import { Button } from './Button';
import { PopUp } from './PopUp';

export type AlertPropsType = {
	message: string;
	isActive: boolean;
	onAccept: () => void;
	onClose: () => void;
};

export const Alert = (props: AlertPropsType) => {
	const { message, isActive, onAccept, onClose } = props;

	return (
		<PopUp isActive={isActive} onClose={onClose}>
			<h3>{message}</h3>

			<div className='mt-5 flex w-full items-center gap-2'>
				<Button className='w-full' onClick={onAccept}>
					<span>Да</span>
				</Button>

				<Button className='w-full' onClick={onClose}>
					<span>Нет</span>
				</Button>
			</div>
		</PopUp>
	);
};
