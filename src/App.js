import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLoading from './components/AppLoading';
import { PrimeReactProvider } from 'primereact/api';

const MainLayout = React.lazy(() => import('./containers/Layout/MainLayout'));
const AuthProvider = React.lazy(() => import('./providers/AuthProvider'));
const MediaProvider = React.lazy(() => import('./providers/MediaProvider'));
const Login = React.lazy(() => import('./containers/Account/Login'));
const Profile = React.lazy(() => import('./containers/Profile/ProfileView'));
const Page500 = React.lazy(() => import('./Page500'));
const Page404 = React.lazy(() => import('./Page404'));

const LayoutSuspense = () => {
	return <AppLoading />;
};

const App = () => {
	return (
		<Router>
			<PrimeReactProvider>
				<React.Suspense fallback={<LayoutSuspense />}>
					<AuthProvider>
						<MediaProvider>
							<Routes>
								<Route path='/' element={<MainLayout />}>
									<Route path='/login' element={<Login />} />
									<Route
										path='/profile'
										element={<Profile />}
									/>
									<Route path='/404' element={<Page404 />} />
									<Route path='/*' element={<Page404 />} />
									<Route path='/500' element={<Page500 />} />
								</Route>
							</Routes>
						</MediaProvider>
					</AuthProvider>
				</React.Suspense>
			</PrimeReactProvider>
		</Router>
	);
};

export default App;
