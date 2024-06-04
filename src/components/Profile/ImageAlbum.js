import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { useMediaContext } from '../../providers/MediaProvider';

const ImageAlbum = ({ title, albumId }) => {
	const [images, setImages] = useState([]);
	const { addPhoto, getPhotos } = useMediaContext();
	const fileInputRef = useRef(null);

	const promptAddNewImage = () => {
		fileInputRef.current.click();
	};

	const handleAddNewImage = (event) => {
		const file = event.target.files[0];
		const imageUrl = URL.createObjectURL(file);
		addPhoto(imageUrl, albumId);
	};

	useEffect(() => {
		setImages(getPhotos(albumId));
	}, [albumId, getPhotos]);

	return (
		<div className='image-album'>
			{title && <h2 className='album-title'>{title}</h2>}
			<Button
				id='submit-image'
				className='button-secondary'
				label='Add new image'
				loading={false}
				iconPos='right'
				disabled={false}
				onClick={promptAddNewImage}
			/>
			<div className='image-grid'>
				{images &&
					images.map((image, index) => (
						<div key={index} className='image-item'>
							<img
								src={image.url}
								alt={image.url || `Image ${index + 1}`}
								className='image'
							/>
						</div>
					))}
			</div>
			<input
				type='file'
				ref={fileInputRef}
				style={{ display: 'none' }}
				onChange={handleAddNewImage}
				accept='image/*'
			/>
		</div>
	);
};

export default ImageAlbum;
