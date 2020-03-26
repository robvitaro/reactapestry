import React from "react";
import {IMAGES} from "../data/images";

const TerritoryTiles = ({advanceTurnState, exploringWithTile, territories}) => {
  const choosing = advanceTurnState?.state?.children?.explore?.state?.matches('ChoosingTile')

  const chooseTile = (tile) => {
    if (choosing) {
      exploringWithTile(tile)
    }
  }

  return(
    <span className='territory-tiles'>
      {territories.map(territory =>
        <img className={choosing ? 'choosing' : ''} src={IMAGES[`tile_${territory}`]} onClick={()=>chooseTile(territory)}/>
      )}
      {choosing &&
        <span className={'smallMessage animated pulse'}>
          &#8592; Choose a <img className={'icon-in-text'} src={IMAGES['territory.png']} /> to explore with
        </span>
      }
    </span>
  )
}

export default TerritoryTiles