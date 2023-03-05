import { Container } from '../components/common/Container';
import { Header } from '../components/common/Header';
import { Navigation } from '../components/common/Navigation';
import { ToastContainer } from '../components/common/ToastContainer';
import { Wrapper } from '../components/common/Wrapper';
import { Update } from '../components/Update';

export const UpdatePage = () => {
	return (
		<Wrapper>
			<Header />
			<Container>
				<Update />
				<ToastContainer />
			</Container>
			<Navigation />
		</Wrapper>
	);
};
