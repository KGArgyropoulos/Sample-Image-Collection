import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Page404 = () => {
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<>
			{location.state ? (
				<div className='flex-col-stretch-stretch w-full'>
					<span className='text-t2 color-black'>
						{location.state.header}
					</span>
					<a
						href='/#'
						onClick={(event) => {
							event.preventDefault();
							navigate('/profile', { replace: true });
						}}
					>
						{location.state.homeLabel}
					</a>
				</div>
			) : (
				<div>Page404</div>
			)}
		</>
	);
};

export default Page404;
