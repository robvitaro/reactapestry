import React from 'react';
import TrackHeaderRow from "./TrackHeaderRow";
import TrackSpace from "./TrackSpace";

const Track = (props) => {
  const {track} = props
  return (
    <div>
      <h3>{track.name}</h3>
      <table border={1}>
        <TrackHeaderRow track={track} />
        <tr>
          {
            track.spaces.map((space) => {
              return <TrackSpace space={space} />
            })
          }
        </tr>
      </table>
    </div>
  )
}

export default Track;