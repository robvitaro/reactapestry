import React from 'react';

const TrackHeaderRow = (props) => {
  const {track} = props
  return (
    <tr>
      <td/>
      <td colSpan={3}>1 Wild</td>
      <td colSpan={3}>1 {track.resource}, 1 Wild</td>
      <td colSpan={3}>1 {track.resource}, 2 Wild</td>
      <td colSpan={3}>2 {track.resource}</td>
    </tr>
  )
}

export default TrackHeaderRow;