import { useAuthContext } from '../../providers/AuthProvider';
import AppLoading from '../../components/AppLoading';
import Login from '../Account/Login';
import ProfileView from '../Profile/ProfileView';

const MainLayout = () => {
	const { loading, authState, username } = useAuthContext();

	if (loading) {
		return <AppLoading />;
	}

	return (
		<div
			className={`main-layout ${
				authState === 'AUTHENTICATED'
					? 'authenticated'
					: 'unauthenticated'
			}`}
		>
			<div className='header'>
				{authState === 'AUTHENTICATED'
					? 'Welcome to Your Profile'
					: 'Please Log In'}
			</div>
			<div className='content'>
				{authState !== 'AUTHENTICATED' ? (
					<Login />
				) : (
					<ProfileView username={username} />
				)}
			</div>
		</div>
	);
};

export default MainLayout;
