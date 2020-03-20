import React from 'react';
import {IMAGES} from "../data/images";

const MAX_RESOURCES = 8

const ResourceTrack = (props) => {
  const {food, workers, coin, culture} = props.resources
  const {advanceTurnState, resourceChosen, message} = props

  const payingCost = advanceTurnState?.state.matches('PayingAdvancementCost')
  const selectingFreeResource = advanceTurnState?.state?.children?.placeBuilding?.state?.matches('SelectFreeResource')

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
      <td key={i}>
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
      {message}
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