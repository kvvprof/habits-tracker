import { Container } from '../components/common/Container';
import { Header } from '../components/common/Header';
import { Navigation } from '../components/common/Navigation';
import { ToastContainer } from '../components/common/ToastContainer';
import { Wrapper } from '../components/common/Wrapper';
import { Create } from '../components/Create';

export const CreatePage = () => {
	return (
		<Wrapper>
			<Header />
			<Container>
				<Create />
				<ToastContainer />
			</Container>
			<Navigation />
		</Wrapper>
	);
};
