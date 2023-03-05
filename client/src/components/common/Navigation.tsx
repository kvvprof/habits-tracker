import {
	HomeIcon,
	QuestionMarkCircleIcon,
	Cog6ToothIcon,
	PlusCircleIcon,
	RectangleStackIcon
} from '@heroicons/react/24/outline';
import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type NavigationButtonType = {
	children: ReactNode;
	route: string;
};

const NavigationButton = (props: NavigationButtonType) => {
	const { children, route } = props;
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<button
			className={`rounded-2xl p-1 hover:bg-c-white dark:hover:bg-c-blue ${
				location.pathname === route && '!bg-c-white dark:!bg-c-blue'
			}`}
			disabled={location.pathname === route}
			onClick={() => navigate(route)}>
			{children}
		</button>
	);
};

export const Navigation = () => {
	return (
		<div className='flex justify-center'>
			<nav className='flex w-full items-center justify-between rounded-2xl border-2 border-c-white bg-gradient-to-r from-[#f3dcfc] via-[#cadefc] to-[#96e9fc] py-2 px-6 dark:border-c-blue dark:bg-gradient-to-r dark:from-c-black dark:to-c-black'>
				<NavigationButton route='/dashboard'>
					<HomeIcon className='navigation-icon ' />
				</NavigationButton>

				<NavigationButton route='/catalog'>
					<RectangleStackIcon className='navigation-icon' />
				</NavigationButton>

				<NavigationButton route='/create'>
					<PlusCircleIcon className='navigation-icon' />
				</NavigationButton>

				<NavigationButton route='/help'>
					<QuestionMarkCircleIcon className='navigation-icon' />
				</NavigationButton>

				<NavigationButton route='/settings'>
					<Cog6ToothIcon className='navigation-icon' />
				</NavigationButton>
			</nav>
		</div>
	);
};
