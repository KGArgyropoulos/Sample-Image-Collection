import React from 'react';
import LoadingSpinner from './Layout/LoadingSpinner';

const AppLoading = () => {
	return (
		<div className='w-full h-full flex-col-center-center'>
			<LoadingSpinner />
		</div>
	);
};

export default React.memo(AppLoading);
