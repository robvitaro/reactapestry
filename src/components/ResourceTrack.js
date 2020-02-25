import React from 'react';
import workerToken from '../img/worker.png';
import coinToken from '../img/coin.png';
import foodToken from '../img/food.png';
import cultureToken from '../img/culture.png';

const ResourceTrack = (props) => {
  const {food, workers, coin, culture} = props.resources
  const {mode, resourceChosen} = props
  const maxValue = 8

  const modeMessage = () => {
    switch (mode) {
      case 'zeroResources': return <span>You're out of resources. Time to take an income turn?</span>
      case 'chooseResourceAny1': return <span>Choose any 1 resource</span>
      default: return <span>&nbsp;</span>
    }
  }

  const takeResource = (resource) => {
    if (mode === 'chooseResourceAny1') {
      resourceChosen(resource)
    }
  }

  const spaces = []

  for(let i = 0; i <= maxValue; i++) {
    spaces.push(
      <td>
        <div>
          <div className={'resource food'}>
            {food === i ? <img src={foodToken} onClick={()=> takeResource('food')}/> : ''}
          </div>
          <div className={'resource worker'}>
            {workers === i ? <img src={workerToken} onClick={()=> takeResource('worker')}/> : ''}
          </div>
        </div>
        <div>
          <div className={'resource coin'}>
            {coin === i ? <img src={coinToken} onClick={()=> takeResource('coin')}/> : ''}
          </div>
          <div className={'resource culture'}>
            {culture === i ? <img src={cultureToken} onClick={()=> takeResource('culture')}/> : ''}
          </div>
        </div>
        <div>{i}</div>
      </td>
    )
  }

  return (
    <div className={'resourceTrack'}>
      <p className={'smallMessage animated pulse'}>{modeMessage()}</p>
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