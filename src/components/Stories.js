import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Stories() {
  const [stories, setStories] = useState([]);
  const [name, setName] = useState('');
  const [story, setStory] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/stories')
      .then(response => setStories(response.data))
      .catch(error => console.error('Error fetching stories:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/stories', { name, story })
      .then(response => {
        setStories([...stories, response.data]);
        setName('');
        setStory('');
      })
      .catch(error => console.error('Error adding story:', error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/stories/${id}`)
      .then(() => {
        setStories(stories.filter(story => story._id !== id));
      })
      .catch(error => console.error('Error deleting story:', error));
  };

  return (
    <div className="stories p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">סיפורים על אמא</h2>
      <form onSubmit={handleSubmit} className="mb-4 bg-white p-6 rounded-lg shadow-md">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="הכנס את שמך"
          className="border p-2 mb-4 w-full rounded"
          required
        />
        <textarea
          value={story}
          onChange={(e) => setStory(e.target.value)}
          placeholder="הכנס את הסיפור שלך"
          className="border p-2 mb-4 w-full rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200">הוסף סיפור</button>
      </form>
      {stories.map(story => (
        <div key={story._id} className="story bg-white shadow-md rounded-lg p-4 mb-4">
          <h3 className="text-xl font-semibold mb-2">{story.name}</h3>
          <p className="text-gray-700">{story.story}</p>
          <button onClick={() => handleDelete(story._id)} className="bg-red-500 text-white p-2 rounded mt-2 hover:bg-red-600 transition duration-200">מחק סיפור</button>
        </div>
      ))}
    </div>
  );
}

export default Stories;