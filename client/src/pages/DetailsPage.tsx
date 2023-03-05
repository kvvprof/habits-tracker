import { Container } from '../components/common/Container';
import { Header } from '../components/common/Header';
import { Navigation } from '../components/common/Navigation';
import { ToastContainer } from '../components/common/ToastContainer';
import { Wrapper } from '../components/common/Wrapper';
import { Details } from '../components/Details';

export const DetailsPage = () => {
	return (
		<Wrapper>
			<Header />
			<Container>
				<Details />
				<ToastContainer />
			</Container>
			<Navigation />
		</Wrapper>
	);
};
