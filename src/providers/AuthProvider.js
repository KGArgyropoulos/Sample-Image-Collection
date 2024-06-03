import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [loading, setLoading] = useState(false);
	const [isAuthorized, setIsAuthorized] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [authState, setAuthState] = useState('INITIAL');
	const [username, setUsername] = useState('');

	const navigate = useNavigate();

	const authorize = async (credentials) => {
		// Simulate authorization logic
		setIsAuthorized(true);
		return true;
	};

	const authenticate = async (credentials) => {
		// Simulate authentication logic
		setIsAuthenticated(true);
		return true;
	};

	const signOut = async () => {
		setLoading(true);
		setIsAuthorized(false);
		setIsAuthenticated(false);
		setAuthState('INITIAL');
		setLoading(false);
		navigate('/login', { replace: true });
	};

	const signIn = async (options) => {
		try {
			setLoading(true);
			const { email, password } = options;
			const authorized = await authorize({ username: email, password });
			let authenticated = false;
			if (authorized) {
				authenticated = await authenticate({
					username: email,
					password,
				});
			}
			if (authenticated) {
				setUsername(email);
			}
			setAuthState('AUTHENTICATED');
		} catch (ex) {
			setAuthState('ERROR');
			throw ex;
		} finally {
			setLoading(false);
		}
	};

	let context = {
		signIn,
		signOut,
		authenticate,
		authorize,
		username,
		loading,
		isAuthorized,
		isAuthenticated,
		authState,
		setAuthState,
	};

	return (
		<AuthContext.Provider value={context}>{children}</AuthContext.Provider>
	);
};

export const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (!context)
		throw new Error('useAuthContext must be used within AuthProvider');
	return context;
};

export default AuthProvider;
