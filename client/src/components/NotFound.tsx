import { useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';

export const NotFound = () => {
	const navigate = useNavigate();

	return (
		<div className='flex h-full w-full items-center justify-center'>
			<div className='flex flex-col items-center justify-center gap-3'>
				<h1>Страница не найдена</h1>
				<Button onClick={() => navigate('/dashboard')}>Вернуться на главную</Button>
			</div>
		</div>
	);
};
