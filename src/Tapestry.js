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
      tapestryHand: 0,
      tapestryMat: 0,
      techCardBottom: 0,
      techCardMiddle: 0,
      techCardTop: 0,
      territoriesOwned: 0,
      territoriesControlled: 0,
      spaceTilesOwned: 0,
      spaceTilesExplored: 0,
      farmsMat: 5,
      housesMat: 5,
      marketsMat: 5,
      armoriesMat: 5,
      farmsCity: 0,
      housesCity: 0,
      marketsCity: 0,
      armoriesCity: 0,
      trackIndex: [0,0,0,0]
    };
    this.handleTrackAdvance = this.handleTrackAdvance.bind(this)
  }

  handleTrackAdvance(index) {
    const newTrackIndex = [...this.state.trackIndex]; // copy so we don't mutate state directly
    newTrackIndex[index] = this.state.trackIndex[index] + 1;
    this.setState({ trackIndex: newTrackIndex });
  }

  render() {
    return (
      <div>
        {
          TRACKS.map((track, index) => {
            return <Track
              key={track.name}
              track={track}
              index={index}
              currentSpace={this.state.trackIndex[index]}
              handleAdvance={this.handleTrackAdvance}
            />
          })
        }
      </div>
    )
  }
}

export default Tapestry