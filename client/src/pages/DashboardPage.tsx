import { Container } from '../components/common/Container';
import { Header } from '../components/common/Header';
import { Navigation } from '../components/common/Navigation';
import { ToastContainer } from '../components/common/ToastContainer';
import { Wrapper } from '../components/common/Wrapper';
import { Dashboard } from '../components/Dashboard';

export const DashboardPage = () => {
	return (
		<Wrapper>
			<Header />
			<Container>
				<Dashboard />
				<ToastContainer />
			</Container>
			<Navigation />
		</Wrapper>
	);
};
