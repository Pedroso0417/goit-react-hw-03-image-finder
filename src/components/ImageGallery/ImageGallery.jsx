import React from 'react';
import ImageGalleryItem from './ImageGalleryItem'; // Assuming you have an ImageGalleryItem component

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className="gallery">
      {images.map(image => (
        <ImageGalleryItem key={image.id} image={image} onClick={onImageClick} />
      ))}
    </ul>
  );
};

export default ImageGallery;
