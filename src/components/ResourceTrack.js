import React from 'react';
import workerToken from '../img/worker.png';
import coinToken from '../img/coin.png';
import foodToken from '../img/food.png';
import cultureToken from '../img/culture.png';
import wildToken from "../img/wild.png";

const ResourceTrack = (props) => {
  const {food, workers, coin, culture} = props.resources
  const {advanceTurnState, resourceChosen} = props
  const maxValue = 8

  const images = {
    'coin': coinToken,
    'culture': cultureToken,
    'food': foodToken,
    'workers': workerToken,
    'wild': wildToken
  }

  const message = () => {
    if(advanceTurnState && advanceTurnState.state.matches('PayingCost')) {
      const cost = advanceTurnState.state.context.advancementCost
      const wildCount = cost.filter(x => x === 'wild').length
      const resource = cost.filter(x => x !== 'wild')[0]
      const resourceCount = cost.filter(x => x !== 'wild').length
      let costImages = []

      if(resource && resourceCount > 0) {
        for(let i = 0; i < resourceCount; i++) {
          costImages.push(<img className='icon-in-text' src={images[resource]} />)
        }
      }
      if(wildCount > 0) {
        for(let i = 0; i < wildCount; i++) {
          costImages.push(<img className='icon-in-text' src={images['wild']} />)
        }
      }
      return <span>To advance, pay: {costImages}</span>
    } else if(advanceTurnState && advanceTurnState.state.matches('SelectFreeResource') ) {
      return <span>You have completed a district! Select a free resource! </span>
    }
    return <span>&nbsp;</span>
  }

  const chooseResource = (resource) => {
    const payingCost = advanceTurnState && advanceTurnState.state.matches('PayingCost')
    const selectingFreeResource = advanceTurnState && advanceTurnState.state.matches('SelectFreeResource')
    if (payingCost || selectingFreeResource) {
      if (payingCost) {
        resourceChosen(resource, 'pay')
      } else if(selectingFreeResource) {
        resourceChosen(resource, 'free')
      }
    }
  }

  const choosingResourceClass = (atIcon) => {
    if(atIcon && advanceTurnState &&
      (advanceTurnState.state.matches('PayingCost') ||
        advanceTurnState.state.matches('SelectFreeResource') )) {
      return 'choosing'
    }
    return ''
  }

  const spaces = []

  for(let i = 0; i <= maxValue; i++) {
    spaces.push(
      <td key={i}>
        <div>
          <div className={`resource coin ${choosingResourceClass(coin === i)}`}>
            {coin === i ? <img alt="coin" src={images['coin']} onClick={()=> chooseResource('coin')}/> : ''}
          </div>
          <div className={`resource food ${choosingResourceClass(food === i)}`}>
            {food === i ? <img alt="food" src={images['food']} onClick={()=> chooseResource('food')}/> : ''}
          </div>
        </div>
        <div>
          <div className={`resource worker ${choosingResourceClass(workers === i)}`}>
            {workers === i ? <img alt="worker" src={images['workers']} onClick={()=> chooseResource('workers')}/> : ''}
          </div>
          <div className={`resource culture ${choosingResourceClass(culture === i)}`}>
            {culture === i ? <img alt="culture" src={images['culture']} onClick={()=> chooseResource('culture')}/> : ''}
          </div>
        </div>
        <div>{i}</div>
      </td>
    )
  }

  return (
    <div className={'resourceTrack'}>
      <p className={'smallMessage animated pulse'}>{message()}</p>
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