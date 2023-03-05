import { Header } from '../components/common/Header';
import { ToastContainer } from '../components/common/ToastContainer';
import { Wrapper } from '../components/common/Wrapper';
import { Welcome } from '../components/Welcome';

export const WelcomePage = () => {
	return (
		<Wrapper>
			<Header />
			<Welcome />
			<ToastContainer />
		</Wrapper>
	);
};
