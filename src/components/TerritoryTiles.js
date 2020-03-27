import React, {useContext} from "react";
import {IMAGES} from "../data/images";
import TapestryContext from "./TapestryContext";

const TerritoryTiles = () => {
  const {currentState, gameStateService} = useContext(TapestryContext);
  const territories = currentState.context.territory
  const advanceTurnState = gameStateService.children.get('advanceTurn')
  const choosing = advanceTurnState?.state?.children?.explore?.state?.matches('ChoosingTile')

  const chooseTile = (tile) => {
    if (choosing) {
      gameStateService.send({type: 'exploringWithTile', tile: tile})
    }
  }

  return(
    <div className='territory-tiles'>
      {territories.map(territory =>
        <img key={`tile_${territory}`}
             className={choosing ? 'choosing' : ''}
             src={IMAGES[`tile_${territory}`]}
             alt={`tile_${territory}`}
             onClick={()=>chooseTile(territory)}
        />
      )}
      {choosing &&
        <span className={'smallMessage animated pulse'}>
          &#8592; Choose a <img className={'icon-in-text'} src={IMAGES['territory.png']} alt='territory' /> to explore with
        </span>
      }
    </div>
  )
}

export default TerritoryTiles