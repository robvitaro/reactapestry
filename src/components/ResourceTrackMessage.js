import React from 'react';
import {IMAGES} from "../data/images";

const ResourceTrackMessage = (props) => {
  const {advanceTurnState} = props

  const message = () => {
    if (advanceTurnState && advanceTurnState.state.matches('PayingCost')) {
      const cost = advanceTurnState.state.context.advancementCost
      const wildCount = cost.filter(x => x === 'wild').length
      const resource = cost.filter(x => x !== 'wild')[0]
      const resourceCount = cost.filter(x => x !== 'wild').length
      let costImages = []

      if (resource && resourceCount > 0) {
        for (let i = 0; i < resourceCount; i++) {
          costImages.push(<img className='icon-in-text' src={IMAGES[resource]}/>)
        }
      }
      if (wildCount > 0) {
        for (let i = 0; i < wildCount; i++) {
          costImages.push(<img className='icon-in-text' src={IMAGES['wild']}/>)
        }
      }
      return <span>To advance, pay: {costImages}</span>
    } else if (advanceTurnState && advanceTurnState.state.matches('SelectFreeResource')) {
      return <span>You have completed a district! Select a free resource! </span>
    }
    return <span>&nbsp;</span>

  }

  return(
    <p className={'smallMessage animated pulse'}>{message()}</p>
  )
}

export default ResourceTrackMessage;