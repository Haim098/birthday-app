import React from 'react';
import Stories from './components/Stories';
import Gallery from './components/Gallery';
import VideoGreetings from './components/VideoGreetings';
import Timeline from './components/Timeline';
import MomQuotes from './components/MomQuotes';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Happy Birthday, Mom!</h1>
      </header>
      <main>
        <Stories />
        <Gallery />
        <VideoGreetings />
        <Timeline />
        <MomQuotes />
      </main>
    </div>
  );
}

export default App;
