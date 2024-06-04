import React, { useState } from 'react';
import { useMediaContext } from '../../providers/MediaProvider';
import { useAuthContext } from '../../providers/AuthProvider';
import { isEmpty } from 'lodash';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const AlbumEntityManagement = (props) => {
	const onSubmit = props.onSubmit;
	const { addAlbum } = useMediaContext();
	const { username } = useAuthContext();

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		addAlbum({ title, description }, username);
		setTitle('');
		setDescription('');
		onSubmit();
	};

	return (
		<>
			<div className='middle-content'>
				<div className='dialog-field'>
					<label
						htmlFor='album-title'
						className='text-t2 color-black'
					>
						Title
					</label>
					<InputText
						id='album-title'
						name='album-title'
						placeholder='Insert Title'
						onChange={(e) => setTitle(e.target.value)}
						value={title}
					/>
				</div>
				<div className='dialog-field'>
					<label
						htmlFor='album-description'
						className='text-t2 block'
					>
						Description
					</label>
					<InputText
						id='album-description'
						name='album-description'
						placeholder='Insert Description'
						onChange={(e) => setDescription(e.target.value)}
						value={description}
					/>
				</div>
			</div>
			<Button
				id='submit-album'
				className='button-primary'
				label='Submit'
				loading={false}
				iconPos='right'
				disabled={isEmpty(title)}
				onClick={(e) => handleSubmit(e)}
			/>
		</>
	);
};

export default AlbumEntityManagement;
