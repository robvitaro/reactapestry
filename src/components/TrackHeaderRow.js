import React from 'react';
import worker from '../img/worker.png';
import coin from '../img/coin.png';
import food from '../img/food.png';
import culture from '../img/culture.png';
import wild from '../img/wild.png';

const TrackHeaderRow = (props) => {
  const {track} = props
  const images = {
    'coin': coin,
    'culture': culture,
    'food': food,
    'workers': worker,
    'wild': wild
  }

  return (
    <tr className='trackHeaderRow'>
      <td className={track.name.toLowerCase()}>
        <div className='header'>{track.name.toUpperCase()}</div>
      </td>
      <td colSpan={3}>
        <div>
          <img src={images['wild']} alt={wild} />
        </div>
      </td>
      <td colSpan={3}>
        <div>
          <img src={images[track.resource]} alt={track.resource} />
          <img src={images['wild']} alt={wild} />
        </div>
      </td>
      <td colSpan={3}>
        <div>
          <img src={images[track.resource]} alt={track.resource} />
          <img src={images['wild']} alt={wild} />
          <img src={images['wild']} alt={wild} />
        </div>
      </td>
      <td colSpan={3}>
        <div>
          <img src={images[track.resource]} alt={track.resource} />
          <img src={images[track.resource]} alt={track.resource} />
        </div>
      </td>
    </tr>
  )
}

export default TrackHeaderRow;