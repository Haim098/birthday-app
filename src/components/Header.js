import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-pink-500 text-white p-4">
      <nav>
        <ul className="flex justify-center space-x-4">
          <li><Link to="/" className="hover:text-pink-200">בית</Link></li>
          <li><Link to="/stories" className="hover:text-pink-200">סיפורים</Link></li>
          <li><Link to="/gallery" className="hover:text-pink-200">גלריה</Link></li>
          <li><Link to="/video-greetings" className="hover:text-pink-200">ברכות וידאו</Link></li>
          <li><Link to="/timeline" className="hover:text-pink-200">ציר זמן</Link></li>
          <li><Link to="/mom-quotes" className="hover:text-pink-200">ציטוטים של אמא</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;