import React, {useState} from 'react';
import {TRACKS} from "../data/tracks";
import Track from "./Track";

const TrackStack = (props) => {
  const {trackIndex, handleAdvance, advancePermitted} = props
  const [activeTrack, setActiveTrack] = useState(0)

  return(
    <div className='trackStack'>
      {TRACKS.map((track, index) => {
        return <div
          className={`switch ${track.name.toLowerCase()} ${index === activeTrack ? 'hidden' : ''}`}
          onClick={() => setActiveTrack(index)}>
          {track.name}
        </div>
      })}
      <div className={'tracks'}>
        {
          TRACKS.map((track, index) => {
            return <Track
              key={track.name}
              track={track}
              index={index}
              visible={activeTrack === index}
              currentSpace={trackIndex[index]}
              handleAdvance={handleAdvance}
              advancePermitted={advancePermitted(index, track.resource)}
            />
          })
        }
      </div>
      <div className='clear'/>
    </div>
  )
}

export default TrackStack