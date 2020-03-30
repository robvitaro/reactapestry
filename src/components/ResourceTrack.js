import React, {useContext} from 'react';
import {IMAGES} from "../data/images";
import TapestryContext from "./TapestryContext";
import ResourceTrackMessage from "./ResourceTrackMessage";

const MAX_RESOURCES = 8

const ResourceTrack = (props) => {
  const {currentState, gameStateService} = useContext(TapestryContext);
  const advanceTurnState = gameStateService.children.get('advanceTurn')
  const {food, workers, coin, culture} = currentState.context

  const payingCost = advanceTurnState?.state.matches('PayingAdvancementCost')
  const selectingFreeResource = advanceTurnState?.state?.children?.placeBuilding?.state?.matches('SelectFreeResource')

  const resourceChosen = (resource, payOrFree) => {
    switch (resource) {
      case 'food': return gameStateService.send({type: payOrFree.concat('Food')})
      case 'workers': return gameStateService.send({type: payOrFree.concat('Worker')})
      case 'coin': return gameStateService.send({type: payOrFree.concat('Coin')})
      case 'culture': return gameStateService.send({type: payOrFree.concat('Culture')})
      default: return null
    }
  }

  const chooseResource = (resource) => {
    if (payingCost || selectingFreeResource) {
      if (payingCost) {
        resourceChosen(resource, 'pay')
      } else if(selectingFreeResource) {
        resourceChosen(resource, 'free')
      }
    }
  }

  const choosingResourceClass = (atIcon) => {
    if(atIcon && (payingCost || selectingFreeResource) ) return 'choosing'
    return ''
  }

  const spaces = []

  for(let i = 0; i <= MAX_RESOURCES; i++) {
    spaces.push(
      <td key={i} className={i === 0 ? 'zero' : ''}>
        <div>
          <div className={`resource coin ${choosingResourceClass(coin === i)}`}>
            {coin === i ? <img alt="coin" src={IMAGES['coin']} onClick={()=> chooseResource('coin')}/> : ''}
          </div>
          <div className={`resource food ${choosingResourceClass(food === i)}`}>
            {food === i ? <img alt="food" src={IMAGES['food']} onClick={()=> chooseResource('food')}/> : ''}
          </div>
        </div>
        <div>
          <div className={`resource worker ${choosingResourceClass(workers === i)}`}>
            {workers === i ? <img alt="worker" src={IMAGES['workers']} onClick={()=> chooseResource('workers')}/> : ''}
          </div>
          <div className={`resource culture ${choosingResourceClass(culture === i)}`}>
            {culture === i ? <img alt="culture" src={IMAGES['culture']} onClick={()=> chooseResource('culture')}/> : ''}
          </div>
        </div>
        <div>{i}</div>
      </td>
    )
  }

  return (
    <div className={'resourceTrack'}>
      <ResourceTrackMessage />
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