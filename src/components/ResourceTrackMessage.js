import React from 'react';
import {IMAGES} from "../data/images";

export const costImageSources = (advanceTurnState) => {
  const cost = advanceTurnState.state.context.advancementCost
  const wildImages = cost.filter(x => x === 'wild').map(() => IMAGES['wild'])
  const resourceCosts = cost.filter(x => x !== 'wild')
  const resource = resourceCosts[0]
  const resourceImages = resourceCosts.map(() => IMAGES[resource])
  return [ ...resourceImages, ...wildImages]
}

const ResourceTrackMessage = (props) => {
  const {advanceTurnState} = props

  const message = () => {
    if (advanceTurnState?.state?.matches('PayingCost')) {
      const images = costImageSources(advanceTurnState).map(src => <img className="icon-in-text" src={src} />)
      return <span>To advance, pay: {images}</span>
    }
    if (advanceTurnState?.state?.matches('SelectFreeResource')) {
      return <span>You have completed a district! Select a free resource! </span>
    }
    return <span>&nbsp;</span>

  }

  return(
    <p className={'smallMessage animated pulse'}>{message()}</p>
  )
}

export default ResourceTrackMessage;