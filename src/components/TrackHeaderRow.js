import React from 'react';
import {IMAGES} from "../data/images";

const TrackHeaderRow = (props) => {
  const {track} = props

  return (
    <tr className='trackHeaderRow'>
      <td className={track.name.toLowerCase()}>
        <div className='header'>{track.name.toUpperCase()}</div>
      </td>
      <td colSpan={3}>
        <div>
          <img src={IMAGES['wild']} alt={'wild'} />
        </div>
      </td>
      <td colSpan={3}>
        <div>
          <img src={IMAGES[track.resource]} alt={track.resource} />
          <img src={IMAGES['wild']} alt={'wild'} />
        </div>
      </td>
      <td colSpan={3}>
        <div>
          <img src={IMAGES[track.resource]} alt={track.resource} />
          <img src={IMAGES['wild']} alt={'wild'} />
          <img src={IMAGES['wild']} alt={'wild'} />
        </div>
      </td>
      <td colSpan={3}>
        <div>
          <img src={IMAGES[track.resource]} alt={track.resource} />
          <img src={IMAGES[track.resource]} alt={track.resource} />
        </div>
      </td>
    </tr>
  )
}

export default TrackHeaderRow;