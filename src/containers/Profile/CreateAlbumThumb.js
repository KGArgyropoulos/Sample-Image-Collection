import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import AlbumEntityManagement from '../../components/Profile/AlbumEntityManagement';

const CreateAlbumThumb = () => {
	const [visible, setVisible] = useState(false);
	return (
		<>
			<div className='flex-col-between-center fluid'>
				<Button
					className='button-primary'
					onClick={() => setVisible(true)}
					label='Add new album'
				></Button>
			</div>
			<Dialog
				header='New Album'
				className='dialog-container'
				headerClassName='dialog-title'
				visible={visible}
				onHide={() => setVisible(false)}
				draggable={false}
				resizable={false}
				maximizable={false}
				maximized={false}
				position={'center'}
				style={{ minWidth: '30%' }}
				children={
					<AlbumEntityManagement onSubmit={() => setVisible(false)} />
				}
			/>
		</>
	);
};

export default React.memo(CreateAlbumThumb);
