import React  from 'react';
import './App.css';
import Track from "./components/Track";
import { TRACKS } from './data/tracks';

function App() {
  return (
    <div>
      {
        TRACKS.map((track) => {
          return <Track key={track.name} track={track} />
        })
      }
    </div>
  );
}

export default App;
