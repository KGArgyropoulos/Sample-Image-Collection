import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import classnames from 'classnames';
import { defaultErrorState } from '../../lib/constants/common';
import { validateEmailString } from '../../lib/utils/common';
import { isEmpty } from 'lodash';
import { useAuthContext } from '../../providers/AuthProvider';

const Login = () => {
	const { loading, signIn } = useAuthContext();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passError, setPassError] = useState(defaultErrorState);
	const [emailError, setEmailError] = useState(defaultErrorState);

	const validateEmail = (email) => {
		let emailState = defaultErrorState;
		if (isEmpty(email)) {
			emailState = {
				hasError: true,
				message: 'Email Cannot Be Empty',
			};
		}
		if (!validateEmailString(email)) {
			emailState = {
				hasError: true,
				message: 'Please add a valid e-mail',
			};
		}
		setEmailError(emailState);
		return emailState;
	};

	const validatePass = () => {
		let passState = defaultErrorState;
		if (isEmpty(password)) {
			passState = {
				hasError: true,
				message: 'Password Cannot Be Empty',
			};
		}
		setPassError(passState);
		return passState;
	};

	const validateCredentials = () => {
		const emailState = validateEmail(email);
		const passState = validatePass();
		return emailState.hasError !== true && passState.hasError !== true;
	};

	const handleSignInAction = async (e) => {
		if (!validateCredentials()) return;
		const creds = { email, password };
		signIn(creds);
	};

	return (
		<div className='login acc-main-content'>
			<div className='middle-content'>
				<div className='field fluid'>
					<label
						htmlFor='identity-username'
						className='text-t2 color-black'
					>
						Email Address
					</label>
					<InputText
						id='identity-username'
						name='identity-username'
						className={classnames({
							invalid: emailError.hasError,
						})}
						placeholder='Insert Email Address'
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
					<small className='invalid text-t3'>
						{!isEmpty(emailError.message)
							? emailError.message
							: ' '}
					</small>
				</div>
				<div className='field fluid'>
					<label htmlFor='password-input' className='text-t2 block'>
						Password
					</label>
					<Password
						id='signin-password'
						inputId='password-input'
						type='password'
						name='password-input'
						className={passError.hasError ? 'invalid' : ''}
						locale='en-US'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						toggleMask
						feedback={false}
					/>
					{passError.hasError && (
						<small className='invalid text-t3'>
							{!isEmpty(passError.message)
								? passError.message
								: ' '}
						</small>
					)}
				</div>
			</div>
			<Button
				id='signinlocal'
				className='button-primary'
				label='Sign In'
				loading={loading}
				iconPos='right'
				disabled={loading || isEmpty(password)}
				onClick={(e) => handleSignInAction(e)}
			/>
		</div>
	);
};

export default Login;
