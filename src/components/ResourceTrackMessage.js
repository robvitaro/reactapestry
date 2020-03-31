import React, {useContext} from 'react';
import {IMAGES} from "../data/images";
import TapestryContext from "./TapestryContext";

export const costImageSources = (advanceTurnState) => {
  const cost = advanceTurnState.state.context.advancementCost
  const wildImages = cost.filter(x => x === 'wild').map(() => IMAGES['wild'])
  const resourceCosts = cost.filter(x => x !== 'wild')
  const resource = resourceCosts[0]
  const resourceImages = resourceCosts.map(() => IMAGES[resource])
  return [ ...resourceImages, ...wildImages]
}

const ResourceTrackMessage = (props) => {
  const {gameStateService} = useContext(TapestryContext);
  const advanceTurnState = gameStateService.children.get('advanceTurn')
  const payingAdvancementCost = advanceTurnState?.state?.matches('PayingAdvancementCost')
  const payingBonusCost = advanceTurnState?.state?.matches('PayingBonusCost') && advanceTurnState.state.context.bonusCost.includes('wild')
  const selectingFreeResource = advanceTurnState?.state?.children?.placeBuilding?.state?.matches('SelectFreeResource')

  const message = () => {
    if (payingAdvancementCost) {
      const images = costImageSources(advanceTurnState).map(src => <img key={src.toString()} className="icon-in-text" src={src} alt='cost' />)
      return <span>To advance, pay: {images}</span>
    }
    if (payingBonusCost) {
      return <span>To receive bonus, pay: <img className="icon-in-text" src={IMAGES['wild']} alt='wild' /></span>
    }
    if (selectingFreeResource) {
      return <span>You have completed a district! Select a free resource! </span>
    }
    return <span>&nbsp;</span>

  }

  return(
    <p className={'smallMessage animated pulse'}>{message()}</p>
  )
}

export default ResourceTrackMessage;