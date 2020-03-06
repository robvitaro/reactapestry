import React from 'react';
import TrackHeaderRow from "./TrackHeaderRow";
import TrackSpace from "./TrackSpace";

const Track = (props) => {
  const {track, index, visible, currentSpace, handleAdvance, advancePermitted} = props
  const disabled = !advancePermitted || currentSpace > 11
  const className = visible ? 'track' : 'track hidden'

  const advanceButton =  <button onClick={()=>handleAdvance(index)} disabled={disabled}>ADVANCE</button>

  return (
    <div className={className}>
      <table>
        <thead>
          <TrackHeaderRow track={track} />
        </thead>
        <tbody>
          <tr>
            {
              track.spaces.map((space, index) => {
                return (
                  <TrackSpace
                    key={index}
                    space={space}
                    occupied={index === currentSpace}
                    className={index === 0 ? track.name.toLowerCase() : ''}
                    advanceButton={index === 0 ? advanceButton : undefined}
                  />
                )
              })
            }
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Track;