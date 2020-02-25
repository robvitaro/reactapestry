import React from 'react';

const TrackSpace = (props) => {
  const {space, occupied, className, advanceButton} = props
  const classOccupied = occupied ? 'occupied' : ''
  const title = space.name ? space.name : <span>&nbsp;</span>;

  return (
    <td className={className}>
      <div className='space'>
        {title}
        <div className={classOccupied}/>
        {advanceButton}
      </div>
    </td>
  )
}

export default TrackSpace;