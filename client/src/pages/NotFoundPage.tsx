import { Container } from '../components/common/Container';
import { Header } from '../components/common/Header';
import { Navigation } from '../components/common/Navigation';
import { Wrapper } from '../components/common/Wrapper';
import { NotFound } from '../components/NotFound';

export const NotFoundPage = () => {
	return (
		<Wrapper>
			<Header />
			<Container>
				<NotFound />
			</Container>
			<Navigation />
		</Wrapper>
	);
};
