import React, {useContext, useState} from 'react';
import {TRACKS} from "../data/tracks";
import Track from "./Track";
import TapestryContext from "./TapestryContext";

const TrackStack = (props) => {
  const {currentState} = useContext(TapestryContext);
  const {trackIndex} = currentState.context
  const [activeTrack, setActiveTrack] = useState(0)

  const checkAnyResource = (minimum, exclude) => {
    let totalResources = 0
    if(exclude !== 'food') { totalResources += currentState.context.food }
    if(exclude !== 'workers') { totalResources += currentState.context.workers }
    if(exclude !== 'coin') { totalResources += currentState.context.coin }
    if(exclude !== 'culture') { totalResources += currentState.context.culture }
    return totalResources >= minimum
  }

  const checkTrackAdvancePermitted = (trackIndex, trackResource) => {
    if(currentState.context.trackIndex[trackIndex] < 3) {
      /* Age 1 requires 1 resource of any kind */
      return checkAnyResource(1, '')
    } else if(currentState.context.trackIndex[trackIndex] < 6) {
      /* Age 2 requires 1 track resource and 1 resource of any kind */
      return currentState.context[trackResource] >= 2 || (currentState.context[trackResource] === 1 && checkAnyResource(1, trackResource))
    } else if(currentState.context.trackIndex[trackIndex] < 9) {
      /* Age 3 requires 1 track resource and 2 resources of any kind */
      return currentState.context[trackResource] >= 3 ||
        (currentState.context[trackResource] === 2 && checkAnyResource(1, trackResource)) ||
        (currentState.context[trackResource] === 1 && checkAnyResource(2, trackResource))
    } else if(currentState.context.trackIndex[trackIndex] < 12) {
      /* Age 4 requires 2 track resources */
      return currentState.context[trackResource] > 1
    }
  }

  return(
    <div className='trackStack'>
      {TRACKS.map((track, index) => {
        return <div
          key={`track_${track.name}`}
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
              advancePermitted={checkTrackAdvancePermitted(index, track.resource)}
            />
          })
        }
      </div>
      <div className='clear'/>
    </div>
  )
}

export default TrackStack