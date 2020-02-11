import React from 'react';

const TrackSpace = (props) => {
  const {space} = props
  return (
    <td>{space.name}</td>
  )
}

export default TrackSpace;