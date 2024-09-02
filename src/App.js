import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/stories" component={Stories} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/video-greetings" component={VideoGreetings} />
          <Route path="/timeline" component={Timeline} />
          <Route path="/mom-quotes" component={MomQuotes} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
