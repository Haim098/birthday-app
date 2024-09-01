import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function Gallery() {
  const [images, setImages] = useState([]);
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const addImage = () => {
    setImages([...images, { image, description }]);
    setImage('');
    setDescription('');
  };

  return (
    <div>
      <h2>Nostalgic Photo Gallery</h2>
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={addImage}>Add Image</button>
      <div className="gallery">
        {images.map((img, index) => (
          <div key={index}>
            <LazyLoadImage
              src={img.image}
              alt={img.description}
              effect="blur"
            />
            <p>{img.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;