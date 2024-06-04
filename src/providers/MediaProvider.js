import React, { createContext, useContext, useState } from 'react';
import { generateGuid } from '../lib/utils/common';

const MediaContext = createContext();

const MediaProvider = ({ children }) => {
	const [loading, setLoading] = useState(false);
	const [albums, setAlbums] = useState([]);
	const [photos, setPhotos] = useState([]);

	const getAlbums = (username) => {
		return albums.filter((album) => album.username === username);
	};

	const getPhotos = (albumId) => {
		return photos.filter((photo) => photo.albumId === albumId);
	};

	const addPhoto = (photo, albumId) => {
		setPhotos((photos) => [...photos, { url: photo, albumId: albumId }]);
	};

	const addAlbum = (album, username) => {
		setAlbums((albums) => [
			...albums,
			{
				id: generateGuid(),
				title: album.title,
				description: album.description,
				username: username,
			},
		]);
	};

	let context = {
		loading,
		getAlbums,
		getPhotos,
		addAlbum,
		addPhoto,
	};

	return (
		<MediaContext.Provider value={context}>
			{children}
		</MediaContext.Provider>
	);
};

export const useMediaContext = () => {
	const context = useContext(MediaContext);
	if (!context)
		throw new Error('useMediaContext must be used within AuthProvider');
	return context;
};

export default MediaProvider;
