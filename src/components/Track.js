import React from 'react';
import TrackHeaderRow from "./TrackHeaderRow";
import TrackSpace from "./TrackSpace";

const Track = (props) => {
  const {track, index, currentSpace, handleAdvance} = props
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
                return <TrackSpace key={index} space={space} occupied={index === currentSpace} />
              })
            }
          </tr>
        </tbody>
      </table>
      <button onClick={()=>handleAdvance(index)} disabled={currentSpace > 11}>ADVANCE</button>
    </div>
  )
}

export default Track;