import React, {useState}  from 'react';
import { useMachine } from '@xstate/react';
import City from "./components/City";
import IncomeMat from "./components/IncomeMat";
import Modal from "./components/Modal";
import SmallHexMap from "./components/SmallHexMap";
import { tapestryGameStateMachine } from "./state_machines/TapestryGameStateMachine";
import { CITIES } from './data/cities';
import TrackStack from "./components/TrackStack";

const Tapestry = () => {
  const [currentState, sendEvent, gameStateService] = useMachine(tapestryGameStateMachine);
  const [showModal, setModal] = useState(false)

  const handleIncomeTurn = () => {
    gameStateService.send('IncomeTurn')
  }

  const handleAdvanceTurn =(index) => {
    gameStateService.send({type: 'AdvanceTurn', index: index})
  }

  const advanceTurnState = () => {
    return currentState.children.advanceTurn
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

  const buildingAdded = freeResource => {
    gameStateService.send({type: 'placedBuilding', freeResource: freeResource})
  }

  const {trackIndex, incomeIndex, food, workers, coin, culture, canTakeIncomeTurn} = currentState.context

  return (
    <div>
      <SmallHexMap />
      <TrackStack
        trackIndex={trackIndex}
        handleAdvance={handleAdvanceTurn}
        advancePermitted={checkTrackAdvancePermitted}
      />
      <div>
        <button onClick={()=>handleIncomeTurn()} disabled={!canTakeIncomeTurn}>Take Income Turn</button>
        <button onClick={()=>setModal(true)}>Show Modal</button>
      </div>
      <div>
        <IncomeMat
          incomeTracks={incomeIndex}
          resources={{food: food,
                      workers: workers,
                      coin: coin,
                      culture: culture
                    }}
          advanceTurnState={advanceTurnState()}
          resourceChosen={resourceChosen}
        />
        <City
          city={CITIES[1]}
          index={1}
          advanceTurnState={advanceTurnState()}
          buildingAdded={buildingAdded}
        />
      </div>
      <Modal handleClose={()=>setModal(false)} show={showModal}>
        <City
          city={CITIES[1]}
          index={1}
          advanceTurnState={advanceTurnState()}
          buildingAdded={buildingAdded}
        />
      </Modal>
    </div>
  )
}

export default Tapestry