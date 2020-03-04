import React from 'react';
import IncomeTrackSpace from "./IncomeTrackSpace";
import coin from '../img/coin.png'
import culture from '../img/culture.png'
import food from '../img/food.png'
import worker from '../img/worker.png'
import tapestry from '../img/tapestry.png'
import territory from '../img/territory.png'
import points4 from '../img/points4.png'
import points7 from '../img/points7.png'
import points10 from '../img/points10.png'
import pointsCity from '../img/pointsCity.png'
import pointsConquered from '../img/pointsConquered.png'
import pointsTech from '../img/pointsTech.png'

const IncomeTrack = (props) => {
  const {incomeTrack, buildingsOnTrack, building} = props
  const images = {
    'coin.png': coin,
    'culture.png': culture,
    'food.png': food,
    'worker.png': worker,
    'tapestry.png': tapestry,
    'territory.png': territory,
    'points4.png': points4,
    'points7.png': points7,
    'points10.png': points10,
    'pointsCity.png': pointsCity,
    'pointsConquered.png': pointsConquered,
    'pointsTech.png': pointsTech
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            {
              incomeTrack.spaces.map((space, index) => {
                const openSpace = index < 6 - buildingsOnTrack
                const incomeImages = space.images.map(image => images[image])

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
  )
}

export default IncomeTrack;