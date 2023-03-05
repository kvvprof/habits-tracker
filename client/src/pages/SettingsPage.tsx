import { Container } from '../components/common/Container';
import { Header } from '../components/common/Header';
import { Navigation } from '../components/common/Navigation';
import { ToastContainer } from '../components/common/ToastContainer';
import { Wrapper } from '../components/common/Wrapper';
import { Settings } from '../components/Settings';

export const SettingsPage = () => {
	return (
		<Wrapper>
			<Header />
			<Container>
				<Settings />
				<ToastContainer />
			</Container>
			<Navigation />
		</Wrapper>
	);
};
