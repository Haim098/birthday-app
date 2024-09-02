import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Gallery() {
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios.get('/api/images')
      .then(response => setImages(response.data))
      .catch(error => console.error('Error fetching images:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('description', description);
    formData.append('image', image);

    axios.post('/api/images', formData)
      .then(response => {
        setImages([...images, response.data]);
        setDescription('');
        setImage(null);
      })
      .catch(error => console.error('Error uploading image:', error));
  };

  const handleDelete = (id) => {
    axios.delete(`/api/images/${id}`)
      .then(() => {
        setImages(images.filter(image => image._id !== id));
      })
      .catch(error => console.error('Error deleting image:', error));
  };

  return (
    <div className="gallery p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">גלריית תמונות</h2>
      <form onSubmit={handleSubmit} className="mb-4 bg-white p-6 rounded-lg shadow-md">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="תיאור התמונה"
          className="border p-2 mb-4 w-full rounded"
          required
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2 mb-4 w-full rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200">העלה תמונה</button>
      </form>
      <div className="image-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map(image => (
          <div key={image._id} className="relative">
            <img src={image.imageUrl} alt={image.description} className="w-full h-64 object-cover rounded-lg shadow-md" />
            <button onClick={() => handleDelete(image._id)} className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200">מחק תמונה</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;