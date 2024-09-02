import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Stories from './components/Stories';
import Gallery from './components/Gallery';
import VideoGreetings from './components/VideoGreetings';
import Timeline from './components/Timeline';
import MomQuotes from './components/MomQuotes';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/video-greetings" element={<VideoGreetings />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/mom-quotes" element={<MomQuotes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
