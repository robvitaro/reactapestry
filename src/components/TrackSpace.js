import React from 'react';

const TrackSpace = (props) => {
  const {space, occupied} = props

  return (
    <td>
      {space.name}
      <br/>
      {occupied ? 'X' : '_'}
    </td>
  )
}

export default TrackSpace;