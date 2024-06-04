import React, { useEffect, useState } from 'react';
import { useMediaContext } from '../../providers/MediaProvider';
import AlbumsSkeletonGallery from '../../components/Layout/AlbumsSkeletonGallery';
import CreateAlbumThumb from './CreateAlbumThumb';
import ImageAlbum from '../../components/Profile/ImageAlbum';

const ProfileView = (props) => {
	const { loading, getAlbums } = useMediaContext();
	const username = props.username;
	const [albums, setAlbums] = useState([]);

	useEffect(() => {
		setAlbums(getAlbums(username));
	}, [username, getAlbums]);

	return (
		<>
			<div className='text-h2'>Albums</div>
			<CreateAlbumThumb />
			{loading === true ? (
				<AlbumsSkeletonGallery size={3} />
			) : (
				<div className='albums-list'>
					{albums.map((album, index) => (
						<ImageAlbum
							key={index}
							title={album.title}
							albumId={album.id}
						/>
					))}
				</div>
			)}
		</>
	);
};

export default ProfileView;
