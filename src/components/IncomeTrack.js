import React from 'react';
import IncomeTrackSpace from "./IncomeTrackSpace";
import {IMAGES} from "../data/images";

const IncomeTrack = (props) => {
  const {incomeTrack, buildingsOnTrack, building} = props

  return (
    <div className='incomeTrack'>
      <div className='incomeTrackHeader'>
        <div className='incomeTrackName'>{incomeTrack.name.toUpperCase()}</div>
        <img className='icon-in-text' src={IMAGES[incomeTrack.name]}/>
      </div>
      <div className='incomeTrackSpaces'>
        <table>
          <tbody>
            <tr>
              {
                incomeTrack.spaces.map((space, index) => {
                  const openSpace = index < 6 - buildingsOnTrack
                  const incomeImages = space.images.map(image => IMAGES[image])

                  return (
                    <IncomeTrackSpace
                      key={index}
                      space={space}
                      openSpace={openSpace}
                      building={building}
                      images={incomeImages}
                    />
                  )
                })
              }
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default IncomeTrack;