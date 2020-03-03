import React from 'react';
import workerToken from '../img/worker.png';
import coinToken from '../img/coin.png';
import foodToken from '../img/food.png';
import cultureToken from '../img/culture.png';

const ResourceTrack = (props) => {
  const {food, workers, coin, culture} = props.resources
  const {advanceTurnState, resourceChosen} = props
  const maxValue = 8

  const message = () => {
    if(advanceTurnState && advanceTurnState.state.matches('PayingCost')) {
      const cost = advanceTurnState.state.context.advancementCost
      const wildCount = cost.filter(x => x === 'wild').length
      const resource = cost.filter(x => x !== 'wild')[0]
      const resourceCount = cost.filter(x => x !== 'wild').length
      let message = "To advance, pay "

      if(resource && resourceCount > 0) {
        message = message.concat(`${resourceCount} ${resource}`)
      }
      if(resourceCount > 0 && wildCount > 0) {
        message = message.concat(' and ')
      }
      if(wildCount > 0) {
        message = message.concat(`${wildCount} of any resource`)
      }
      return <span>{message}</span>
    }
    return <span>&nbsp;</span>
  }

  const takeResource = (resource) => {
    if (advanceTurnState && advanceTurnState.state.matches('PayingCost')) {
      resourceChosen(resource)
    }
  }

  const payingCostClass = (atIcon) => (atIcon && advanceTurnState && advanceTurnState.state.matches('PayingCost')) ? 'choosing' : ''

  const spaces = []

  for(let i = 0; i <= maxValue; i++) {
    spaces.push(
      <td key={i}>
        <div>
          <div className={`resource food ${payingCostClass(food === i)}`}>
            {food === i ? <img alt="food" src={foodToken} onClick={()=> takeResource('food')}/> : ''}
          </div>
          <div className={`resource worker ${payingCostClass(workers === i)}`}>
            {workers === i ? <img alt="worker" src={workerToken} onClick={()=> takeResource('worker')}/> : ''}
          </div>
        </div>
        <div>
          <div className={`resource coin ${payingCostClass(coin === i)}`}>
            {coin === i ? <img alt="coin" src={coinToken} onClick={()=> takeResource('coin')}/> : ''}
          </div>
          <div className={`resource culture ${payingCostClass(culture === i)}`}>
            {culture === i ? <img alt="culture" src={cultureToken} onClick={()=> takeResource('culture')}/> : ''}
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