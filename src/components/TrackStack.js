import React from 'react';
import {TRACKS} from "../data/tracks";
import Track from "./Track";

const TrackStack = (props) => {
  const {trackIndex, handleAdvance, advancePermitted} = props

  return(
    <div>
      {
        TRACKS.map((track, index) => {
          return <Track
            key={track.name}
            track={track}
            index={index}
            currentSpace={trackIndex[index]}
            handleAdvance={handleAdvance}
            advancePermitted={advancePermitted(index, track.resource)}
          />
        })
      }
    </div>
  )
}

export default TrackStack