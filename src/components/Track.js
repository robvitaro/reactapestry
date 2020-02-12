import React from 'react';
import TrackHeaderRow from "./TrackHeaderRow";
import TrackSpace from "./TrackSpace";

const Track = (props) => {
  const {track, index, currentSpace, handleAdvance} = props
  return (
    <div>
      <h3>{track.name}</h3>
      <table border={1}>
        <thead>
          <TrackHeaderRow track={track} />
        </thead>
        <tbody>
          <tr>
            <td>{currentSpace === 0 ? 'X' : '_'}</td>
            {
              track.spaces.map((space, index) => {
                let slot = index + 1
                return <TrackSpace key={slot} space={space} slot={slot} currentSpace={currentSpace} />
              })
            }
          </tr>
        </tbody>
      </table>
      <button onClick={()=>handleAdvance(index)}>ADVANCE</button>
    </div>
  )
}

export default Track;