import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CatalogPage } from '../../pages/CatalogPage';
import { CreatePage } from '../../pages/CreatePage';
import { DashboardPage } from '../../pages/DashboardPage';
import { DetailsPage } from '../../pages/DetailsPage';
import { HelpPage } from '../../pages/HelpPage';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { SettingsPage } from '../../pages/SettingsPage';
import { UpdatePage } from '../../pages/UpdatePage';
import { WelcomePage } from '../../pages/WelcomePage';

export const Router = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <WelcomePage />,
			errorElement: <NotFoundPage />
		},
		{
			path: 'dashboard',
			element: <DashboardPage />
		},
		{
			path: 'create',
			element: <CreatePage />
		},
		{
			path: 'update',
			element: <UpdatePage />
		},
		{
			path: 'catalog',
			element: <CatalogPage />
		},
		{
			path: 'habit/:id',
			element: <DetailsPage />
		},
		{
			path: 'help',
			element: <HelpPage />
		},
		{
			path: 'settings',
			element: <SettingsPage />
		}
	]);

	return <RouterProvider router={router} />;
};
