import React from 'react';

const TrackSpace = (props) => {
  const {space, occupied} = props
  const classOccupied = occupied ? 'occupied' : ''
  const title = space.name ? space.name : <span>&nbsp;</span>;

  return (
    <td>
      <div className='space'>
        {title}
        <div className={classOccupied}/>
      </div>
    </td>
  )
}

export default TrackSpace;