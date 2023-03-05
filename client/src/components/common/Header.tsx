import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useThemeStore } from '../../store/useThemeStore';
import { useUserStore } from '../../store/useUserStore';
import { getPartOfTheDay } from '../../utils/helpers';
import logo from '../../assets/logo.svg';
import { Link, useLocation } from 'react-router-dom';

const ThemeSwitcher = () => {
	const { setTheme, isDarkMode } = useThemeStore();

	return (
		<button className='rounded-full bg-c-white p-3 dark:bg-c-gray-5' onClick={() => setTheme(!isDarkMode)}>
			{isDarkMode ? (
				<SunIcon className='h-6 w-6 text-c-white dark:text-c-white-2 xs:h-4 xs:w-4' />
			) : (
				<MoonIcon className='h-6 w-6 text-c-black xs:h-4 xs:w-4' />
			)}
		</button>
	);
};

export const Header = () => {
	const user = useUserStore((state) => state.user);
	const location = useLocation();

	const greeting = (): string => {
		switch (getPartOfTheDay()) {
			case 'утро':
				return 'Доброе утро';
			case 'день':
				return 'Добрый день';
			case 'вечер':
				return 'Добрый вечер!';
			case 'ночь':
				return 'Доброй ночи!';
			default:
				return 'Здравствуйте!';
		}
	};

	return (
		<header className='flex items-center justify-between gap-3 '>
			<Link to={`${location.pathname !== '/' ? '/dashboard' : '/'}`} className='box-2 flex items-center gap-2 !p-2'>
				<img className='h-[35px] w-[35px] xs:h-[25px] xs:w-[25px]' src={logo} alt='logo' />
				<h1>Трекер привычек</h1>
			</Link>

			{user && (
				<div className='flex flex-1 justify-end sm:hidden'>
					<div className='ml-1'>
						<p className='text-right text-gray-500 dark:text-c-gray-3'>{greeting()}</p>
						<p className='text-right text-xl font-medium'>{user.name}</p>
					</div>
				</div>
			)}

			<ThemeSwitcher />
		</header>
	);
};
