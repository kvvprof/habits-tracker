import { Catalog } from '../components/Catalog';
import { Container } from '../components/common/Container';
import { Header } from '../components/common/Header';
import { Navigation } from '../components/common/Navigation';
import { ToastContainer } from '../components/common/ToastContainer';
import { Wrapper } from '../components/common/Wrapper';

export const CatalogPage = () => {
	return (
		<Wrapper>
			<Header />
			<Container>
				<Catalog />
				<ToastContainer />
			</Container>
			<Navigation />
		</Wrapper>
	);
};
