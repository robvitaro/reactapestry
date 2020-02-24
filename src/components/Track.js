import React from 'react';
import TrackHeaderRow from "./TrackHeaderRow";
import TrackSpace from "./TrackSpace";

const Track = (props) => {
  const {track, index, currentSpace, handleAdvance, advancePermitted} = props
  const disabled = !advancePermitted || currentSpace > 11

  return (
    <div className='track'>
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
                  />
                )
              })
            }
          </tr>
        </tbody>
      </table>
      <button onClick={()=>handleAdvance(index)} disabled={disabled}>ADVANCE</button>
    </div>
  )
}

export default Track;