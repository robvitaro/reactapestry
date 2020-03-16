import React from 'react';
import {IMAGES} from "../data/images";

const TrackSpace = (props) => {
  const {space, occupied, className, advanceButton} = props
  const classOccupied = occupied ? 'occupied' : ''
  const title = space.name ? space.name.toUpperCase() : <span>&nbsp;</span>;
  const image = IMAGES[space.name]

  return (
    <td className={className}>
      <div className='space'>
        {title}
        <img src={image} alt={space.name} />
        <div className={classOccupied}/>
        {advanceButton}
      </div>
    </td>
  )
}

export default TrackSpace;