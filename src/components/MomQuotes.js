import React, { useState } from 'react';

function MomQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState('');

  const addQuote = () => {
    setQuotes([...quotes, quote]);
    setQuote('');
  };

  return (
    <div>
      <h2>Quotes Only Mom Can Say</h2>
      <input
        type="text"
        placeholder="Add a funny quote"
        value={quote}
        onChange={(e) => setQuote(e.target.value)}
      />
      <button onClick={addQuote}>Add Quote</button>
      <ul>
        {quotes.map((q, index) => (
          <li key={index}>{q}</li>
        ))}
      </ul>
    </div>
  );
}

export default MomQuotes;