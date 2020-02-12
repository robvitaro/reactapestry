import React  from 'react';
import Track from "./components/Track";
import { TRACKS } from './data/tracks';

class Tapestry extends React.Component {
  /*

  VPs
  territory tiles owned
  territories controlled
  space tiles owned
  space tiles explored
  houses, markets, farms, armories on mat (unused)
  houses, markets, farms, armories in city
  tapestry cards
  coin, worker, food, culture
  tech cards owned

 */

  render() {
    return (
      <div>
        {
          TRACKS.map((track) => {
            return <Track key={track.name} track={track} />
          })
        }
      </div>
    )
  }
}

export default Tapestry