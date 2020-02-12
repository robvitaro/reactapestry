import React  from 'react';
import Track from "./components/Track";
import { TRACKS } from './data/tracks';

class Tapestry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vp: 0,
      food: 0,
      workers: 0,
      coin: 0,
      culture: 0,
      tapestry_hand: 0,
      tapestry_mat: 0,
      tech_card_bottom: 0,
      tech_card_middle: 0,
      tech_card_top: 0,
      territories_owned: 0,
      territories_controlled: 0,
      space_tiles_owned: 0,
      space_tiles_explored: 0,
      farms_mat: 5,
      houses_mat: 5,
      markets_mat: 5,
      armories_mat: 5,
      farms_city: 0,
      houses_city: 0,
      markets_city: 0,
      armories_city: 0,
      exploration_track_index: 0,
      science_track_index: 0,
      technology_track_index: 0,
      military_track_index: 0,
    };
  }

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