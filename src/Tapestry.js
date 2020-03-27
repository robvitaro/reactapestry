import React, {useContext} from 'react';
import City from "./components/City";
import IncomeMat from "./components/IncomeMat";
import Modal from "./components/Modal";
import SmallHexMap from "./components/SmallHexMap";
import { CITIES } from './data/cities';
import { IMAGES } from './data/images';
import TrackStack from "./components/TrackStack";
import TerritoryTiles from "./components/TerritoryTiles";
import TapestryContext from "./components/TapestryContext";

const Tapestry = () => {
  const {currentState, gameStateService} = useContext(TapestryContext);

  const advanceTurnState = () => {
    return gameStateService.children.get('advanceTurn')
  }

  const showModal = () => {
    return advanceTurnState()?.state?.matches('ChoosingGain') // or other things..
  }

  const buildingAdded = (freeResource, completedLines) => {
    gameStateService.send({type: 'placedBuilding', freeResource: freeResource, completedLines: completedLines})
  }

  const gainVP = (value) => {
    gameStateService.send({type: 'gainVP', value: value})
  }

  const explored = () => {
    gameStateService.send({type: 'explored'})
  }

  const chooseGain = (gain) => {
    gameStateService.send({type: 'chooseOneGainFromAdvance', gains: [gain]})
  }

  const {vp} = currentState.context

  return (
    <div>
      <SmallHexMap
        gainVP={gainVP}
        addingTile={advanceTurnState()?.state?.children?.explore?.state?.matches('Exploring') ? advanceTurnState().state?.children?.explore?.state?.context.tile : 0}
        explored={explored}
      />
      <TrackStack />
      <TerritoryTiles />
      <div>
        <IncomeMat />
        <City
          city={CITIES[1]}
          index={1}
          advanceTurnState={advanceTurnState()}
          buildingAdded={buildingAdded}
        />
        <div>VP: {vp}</div>
      </div>
      <Modal show={showModal()}>
        {advanceTurnState()?.state?.matches('ChoosingGain') &&
          <div>
            <h2>Choose:</h2>
            {advanceTurnState().state.context.gains.map(gain => {
                return <img src={IMAGES[gain['type']]} onClick={()=> chooseGain(gain)}/>
              })
            }
          </div>
        }
      </Modal>
    </div>
  )
}

export default Tapestry