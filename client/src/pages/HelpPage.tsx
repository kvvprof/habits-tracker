import { Container } from '../components/common/Container';
import { Header } from '../components/common/Header';
import { Navigation } from '../components/common/Navigation';
import { Wrapper } from '../components/common/Wrapper';
import { Help } from '../components/Help';

export const HelpPage = () => {
	return (
		<Wrapper>
			<Header />
			<Container>
				<Help />
			</Container>
			<Navigation />
		</Wrapper>
	);
};
