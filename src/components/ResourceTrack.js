import React from 'react';
import workerToken from '../img/worker.png';
import coinToken from '../img/coin.png';
import foodToken from '../img/food.png';
import cultureToken from '../img/culture.png';

const ResourceTrack = (props) => {
  const {food, workers, coin, culture} = props.resources
  const maxValue = 8

  const spaces = []

  for(let i = 0; i <= maxValue; i++) {
    spaces.push(
      <td>
        <div>
          <div className={'resource food'}>{food === i ? <img src={foodToken}/> : ''}</div>
          <div className={'resource worker'}>{workers === i ? <img src={workerToken}/> : ''}</div>
        </div>
        <div>
          <div className={'resource coin'}>{coin === i ? <img src={coinToken}/> : ''}</div>
          <div className={'resource culture'}>{culture === i ? <img src={cultureToken}/> : ''}</div>
        </div>
        <div>{i}</div>
      </td>
    )
  }

  return (
    <div className={'resourceTrack'}>
      <table>
        <tbody>
          <tr>
            {spaces}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ResourceTrack;