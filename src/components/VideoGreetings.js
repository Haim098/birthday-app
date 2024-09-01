import React, { useState } from 'react';

function VideoGreetings() {
  const [videos, setVideos] = useState([]);
  const [video, setVideo] = useState('');
  const [title, setTitle] = useState('');

  const addVideo = () => {
    setVideos([...videos, { video, title }]);
    setVideo('');
    setTitle('');
  };

  return (
    <div>
      <h2>Video Greetings</h2>
      <input
        type="text"
        placeholder="Video URL"
        value={video}
        onChange={(e) => setVideo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addVideo}>Add Video</button>
      <div className="video-gallery">
        {videos.map((vid, index) => (
          <div key={index}>
            <h3>{vid.title}</h3>
            <video controls>
              <source src={vid.video} type="video/mp4" />
            </video>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoGreetings;