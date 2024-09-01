import React, { useState } from 'react';

function Timeline() {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const addEvent = () => {
    setEvents([...events, { date, description, image }]);
    setDate('');
    setDescription('');
    setImage('');
  };

  return (
    <div>
      <h2>Interactive Timeline</h2>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button onClick={addEvent}>Add Event</button>
      <div className="timeline">
        {events.map((event, index) => (
          <div key={index}>
            <h3>{event.date}</h3>
            <p>{event.description}</p>
            {event.image && <img src={event.image} alt={event.description} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timeline;