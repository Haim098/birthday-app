import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VideoGreetings() {
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState('');
  const [video, setVideo] = useState(null);

  useEffect(() => {
    axios.get('/api/videos')
      .then(response => setVideos(response.data))
      .catch(error => console.error('Error fetching videos:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('video', video);

    axios.post('/api/videos', formData)
      .then(response => {
        setVideos([...videos, response.data]);
        setTitle('');
        setVideo(null);
      })
      .catch(error => console.error('Error uploading video:', error));
  };

  const handleDelete = (id) => {
    axios.delete(`/api/videos/${id}`)
      .then(() => {
        setVideos(videos.filter(video => video._id !== id));
      })
      .catch(error => console.error('Error deleting video:', error));
  };

  return (
    <div className="video-greetings p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">ברכות וידאו</h2>
      <form onSubmit={handleSubmit} className="mb-4 bg-white p-6 rounded-lg shadow-md">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="כותרת הסרטון"
          className="border p-2 mb-4 w-full rounded"
          required
        />
        <input
          type="file"
          onChange={(e) => setVideo(e.target.files[0])}
          className="border p-2 mb-4 w-full rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200">העלה סרטון</button>
      </form>
      <div className="video-grid grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.map(video => (
          <div key={video._id} className="video bg-white shadow-md rounded-lg p-4 relative">
            <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
            <video controls src={video.videoUrl} className="w-full h-64 object-cover rounded-lg shadow-md"></video>
            <button onClick={() => handleDelete(video._id)} className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200">מחק סרטון</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoGreetings;