import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Stories() {
  const [stories, setStories] = useState([]);
  const [name, setName] = useState('');
  const [story, setStory] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/stories')
      .then(response => setStories(response.data))
      .catch(error => console.error(error));
  }, []);

  const addStory = () => {
    axios.post('http://localhost:5000/stories', { name, story })
      .then(response => setStories([...stories, response.data]))
      .catch(error => console.error(error));
    setName('');
    setStory('');
  };

  return (
    <div>
      <h2>Stories about Mom</h2>
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Your story"
        value={story}
        onChange={(e) => setStory(e.target.value)}
      />
      <button onClick={addStory}>Add Story</button>
      <ul>
        {stories.map((s, index) => (
          <li key={index}>
            <strong>{s.name}:</strong> {s.story}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Stories;