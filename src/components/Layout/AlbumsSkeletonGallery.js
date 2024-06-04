import React from 'react';
import { Skeleton } from 'primereact/skeleton';

const DEFAULT_ALBUMS_LOAD_SIZE = 8;

const AlbumsSkeletonGallery = ({ size, className }) => {
	let items = new Array(size ?? DEFAULT_ALBUMS_LOAD_SIZE).fill(null);
	return (
		<div className={className ?? 'skeleton-grid-gallery-albums'}>
			{items.map((item, index) => {
				return (
					<div key={`thumb-${index}`} className='square'>
						<Skeleton className='thumb-wrapper' />
					</div>
				);
			})}
		</div>
	);
};

export default React.memo(AlbumsSkeletonGallery);
