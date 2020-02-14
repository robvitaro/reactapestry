import React from 'react';

const TrackHeaderRow = (props) => {
  const {track} = props
  return (
    <tr>
      <td><div className='header'>{track.name}</div></td>
      <td colSpan={3}><div>1 Wild</div></td>
      <td colSpan={3}><div>1 {track.resource}, 1 Wild</div></td>
      <td colSpan={3}><div>1 {track.resource}, 2 Wild</div></td>
      <td colSpan={3}><div>2 {track.resource}</div></td>
    </tr>
  )
}

export default TrackHeaderRow;