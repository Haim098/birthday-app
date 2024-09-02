import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MomQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/quotes')
      .then(response => setQuotes(response.data))
      .catch(error => console.error('Error fetching quotes:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/quotes', { quote })
      .then(response => {
        setQuotes([...quotes, response.data]);
        setQuote('');
      })
      .catch(error => console.error('Error adding quote:', error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/quotes/${id}`)
      .then(() => {
        setQuotes(quotes.filter(quote => quote._id !== id));
      })
      .catch(error => console.error('Error deleting quote:', error));
  };

  return (
    <div className="mom-quotes p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">ציטוטים של אמא</h2>
      <form onSubmit={handleSubmit} className="mb-4 bg-white p-6 rounded-lg shadow-md">
        <textarea
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="הכנס את הציטוט של אמא"
          className="border p-2 mb-4 w-full rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200">הוסף ציטוט</button>
      </form>
      {quotes.map(quote => (
        <blockquote key={quote._id} className="bg-white shadow-md rounded-lg p-4 mb-4 italic relative">
          "{quote.quote}"
          <footer className="text-right mt-2 text-gray-600">- אמא</footer>
          <button onClick={() => handleDelete(quote._id)} className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200">מחק ציטוט</button>
        </blockquote>
      ))}
    </div>
  );
}

export default MomQuotes;