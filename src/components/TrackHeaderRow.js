import React from 'react';
import {IMAGES} from "../data/images";

const TrackHeaderRow = (props) => {
  const {track} = props

  return (
    <tr className='trackHeaderRow'>
      <td className={track.name.toLowerCase()}>
        <div className='header'>{track.name.toUpperCase()}</div>
      </td>
      <td className='era-cell' colSpan={3}>
        <div className='era-back'/>
        <div className='era'>I</div>
        <div>
          <img src={IMAGES['wild']} alt={'wild'} />
        </div>
      </td>
      <td className='era-cell' colSpan={3}>
        <div className='era-back'/>
        <div className='era'>II</div>
        <div>
          <img src={IMAGES[track.resource]} alt={track.resource} />
          <img src={IMAGES['wild']} alt={'wild'} />
        </div>
      </td>
      <td className='era-cell' colSpan={3}>
        <div className='era-back'/>
        <div className='era'>III</div>
        <div>
          <img src={IMAGES[track.resource]} alt={track.resource} />
          <img src={IMAGES['wild']} alt={'wild'} />
          <img src={IMAGES['wild']} alt={'wild'} />
        </div>
      </td>
      <td className='era-cell' colSpan={3}>
        <div className='era-back'/>
        <div className='era'>IV</div>
        <div>
          <img src={IMAGES[track.resource]} alt={track.resource} />
          <img src={IMAGES[track.resource]} alt={track.resource} />
        </div>
      </td>
    </tr>
  )
}

export default TrackHeaderRow;