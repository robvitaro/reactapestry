import React, {useContext} from 'react';
import City from "./components/City";
import IncomeMat from "./components/IncomeMat";
import Modal from "./components/Modal";
import SmallHexMap from "./components/SmallHexMap";
import { CITIES } from './data/cities';
import { IMAGES } from './data/images';
import TrackStack from "./components/TrackStack";
import ResourceTrack from "./components/ResourceTrack";
import ResourceTrackMessage from "./components/ResourceTrackMessage";
import TerritoryTiles from "./components/TerritoryTiles";
import TapestryContext from "./components/TapestryContext";

const Tapestry = () => {
  const {currentState, gameStateService} = useContext(TapestryContext);

  const handleIncomeTurn = () => {
    if(canTakeIncomeTurn) gameStateService.send('IncomeTurn')
  }

  const handleAdvanceTurn =(index) => {
    gameStateService.send({type: 'AdvanceTurn', index: index})
  }

  const advanceTurnState = () => {
    return gameStateService.children.get('advanceTurn')
  }

  const showModal = () => {
    return advanceTurnState()?.state?.matches('ChoosingGain') // or other things..
  }

  const resourceChosen = (resource, payOrFree) => {
    switch (resource) {
      case 'food': return gameStateService.send({type: payOrFree.concat('Food')})
      case 'workers': return gameStateService.send({type: payOrFree.concat('Worker')})
      case 'coin': return gameStateService.send({type: payOrFree.concat('Coin')})
      case 'culture': return gameStateService.send({type: payOrFree.concat('Culture')})
      default: return null
    }
  }

  const checkAnyResource = (minimum, exclude) => {
    let totalResources = 0
    if(exclude !== 'food') { totalResources += currentState.context.food }
    if(exclude !== 'workers') { totalResources += currentState.context.workers }
    if(exclude !== 'coin') { totalResources += currentState.context.coin }
    if(exclude !== 'culture') { totalResources += currentState.context.culture }
    return totalResources >= minimum
  }

  const checkTrackAdvancePermitted = (trackIndex, trackResource) => {
    if(currentState.context.trackIndex[trackIndex] < 3) {
      /* Age 1 requires 1 resource of any kind */
      return checkAnyResource(1, '')
    } else if(currentState.context.trackIndex[trackIndex] < 6) {
      /* Age 2 requires 1 track resource and 1 resource of any kind */
      return currentState.context[trackResource] >= 2 || (currentState.context[trackResource] === 1 && checkAnyResource(1, trackResource))
    } else if(currentState.context.trackIndex[trackIndex] < 9) {
      /* Age 3 requires 1 track resource and 2 resources of any kind */
      return currentState.context[trackResource] >= 3 ||
            (currentState.context[trackResource] === 2 && checkAnyResource(1, trackResource)) ||
            (currentState.context[trackResource] === 1 && checkAnyResource(2, trackResource))
    } else if(currentState.context.trackIndex[trackIndex] < 12) {
      /* Age 4 requires 2 track resources */
      return currentState.context[trackResource] > 1
    }
  }

  const buildingAdded = (freeResource, completedLines) => {
    gameStateService.send({type: 'placedBuilding', freeResource: freeResource, completedLines: completedLines})
  }

  const gainVP = (value) => {
    gameStateService.send({type: 'gainVP', value: value})
  }

  const exploringWithTile = (tile) => {
    gameStateService.send({type: 'exploringWithTile', tile: tile})
  }

  const explored = () => {
    gameStateService.send({type: 'explored'})
  }

  const chooseGain = (gain) => {
    gameStateService.send({type: 'chooseOneGainFromAdvance', gains: [gain]})
  }

  const {trackIndex, incomeIndex, food, workers, coin, culture, territory, canTakeIncomeTurn, vp} = currentState.context

  return (
    <div>
      <SmallHexMap
        gainVP={gainVP}
        exploringWithTile={exploringWithTile}
        addingTile={advanceTurnState()?.state?.children?.explore?.state?.matches('Exploring') ? advanceTurnState().state?.children?.explore?.state?.context.tile : 0}
        explored={explored}
      />
      <TrackStack
        trackIndex={trackIndex}
        handleAdvance={handleAdvanceTurn}
        advancePermitted={checkTrackAdvancePermitted}
      />
      <TerritoryTiles territories={territory} exploringWithTile={exploringWithTile} advanceTurnState={advanceTurnState()}/>
      <div>
        <div className='incomeMat income-turn'>
          <img className={canTakeIncomeTurn ? 'income-turn' : 'income-turn-disabled'} src={IMAGES['income-turn']} onClick={()=>handleIncomeTurn()}/>
        </div>
        <IncomeMat
          incomeTracks={incomeIndex}
          resourceTrack={
            <ResourceTrack
              resources={{
                food: food,
                workers: workers,
                coin: coin,
                culture: culture
              }}
              advanceTurnState={advanceTurnState()}
              resourceChosen={resourceChosen}
              message={<ResourceTrackMessage />}
            />
          }
        />
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