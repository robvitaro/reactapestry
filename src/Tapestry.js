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

  // VP conditions
  function explorationTrackAdvances() { return currentState.context.trackIndex[0]}
  function scienceTrackAdvances() { return currentState.context.trackIndex[1]}
  function technologyTrackAdvances() { return currentState.context.trackIndex[2]}
  function militaryTrackAdvances() { return currentState.context.trackIndex[3]}
  function territoriesOwned() { return currentState.context.territoriesOwned}
  function territoriesControlled() { return currentState.context.territoriesControlled}
  function marketsInCity() { return 5 - currentState.context.incomeIndex[0]}
  function housesInCity() { return 5 - currentState.context.incomeIndex[1]}
  function farmsInCity() { return 5 - currentState.context.incomeIndex[2]}
  function armoriesInCity() { return 5 - currentState.context.incomeIndex[3]}
  function techCards() { return currentState.context.techCardBottom + currentState.context.techCardMiddle + currentState.context.techCardTop}
  function offTrackAdvancement() { return 0 }
  function tapestryAll() { return currentState.context.tapestryHand + currentState.context.tapestryMat }
  function flat() { return 1 }

  function handleIncomeTurn() {
    gameStateService.send('IncomeTurn')
  }

  function handleAdvanceTurn(index) {
    gameStateService.send({type: 'AdvanceTurn', index: index})
  }

  function advanceTurnState() {
    return currentState.children.advanceTurn
  }

  function resourceChosen(resource, payOrFree) {
    switch (resource) {
      case 'food': return gameStateService.send({type: payOrFree.concat('Food')})
      case 'workers': return gameStateService.send({type: payOrFree.concat('Worker')})
      case 'coin': return gameStateService.send({type: payOrFree.concat('Coin')})
      case 'culture': return gameStateService.send({type: payOrFree.concat('Culture')})
      default: return null
    }
  }

  function checkForZeroResources() {
    // if (!checkAnyResource(1)) {setState({mode: 'zeroResources'})}
  }

  function checkAnyResource(minimum, exclude) {
    let totalResources = 0
    if(exclude !== 'food') { totalResources += currentState.context.food }
    if(exclude !== 'workers') { totalResources += currentState.context.workers }
    if(exclude !== 'coin') { totalResources += currentState.context.coin }
    if(exclude !== 'culture') { totalResources += currentState.context.culture }
    return totalResources >= minimum
  }

  function checkTrackAdvancePermitted(trackIndex, trackResource) {
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

  function buildingAdded(freeResource) {
    gameStateService.send({type: 'placedBuilding', freeResource: freeResource})
  }

  function updateStateVar(field, value, callback) {
    // setState(prevState => { return { [field]: prevState[field] + value}}, callback)
  }

  function explore(gain) {
    updateStateVar('territoriesOwned', gain.qty * -1)
    updateStateVar('territoriesExplored', gain.qty)
  }

  function exploreAnywhere(gain) {
    updateStateVar('territoriesOwned', gain.qty * -1)
    updateStateVar('territoriesExplored', gain.qty)
  }

  function vp(gain) {
    updateStateVar('vp', gain.qty * this[gain.condition]())
  }

  function spaceTile(gain) {
    updateStateVar('spaceTilesOwned', gain.qty)
  }

  function exploreSpace(gain) {
    updateStateVar('spaceTilesOwned', gain.qty * -1)
    updateStateVar('spaceTilesExplored', gain.qty)
  }

  function techCard(gain) {
    updateStateVar('techCardBottom', gain.qty)
  }

  function updateIncomeIndex(index, qty) {
    const newIncomeIndex = [...currentState.context.incomeIndex]; // copy so we don't mutate state directly
    newIncomeIndex[index] = currentState.context.incomeIndex[index] - qty;
    // setState({ incomeIndex: newIncomeIndex });
  }

  function market(gain) {
    updateIncomeIndex(0, gain.qty)
    // setState({mode: 'adding-m'})
  }

  function house(gain) {
    updateIncomeIndex(1, gain.qty)
    // setState({mode: 'adding-h'})
  }

  function farm(gain) {
    updateIncomeIndex(2, gain.qty)
    // setState({mode: 'adding-f'})
  }

  function armory(gain) {
    updateIncomeIndex(3, gain.qty)
    // setState({mode: 'adding-a'})
  }

  function conquer(gain) {
    updateStateVar('territoriesControlled', gain.qty)
  }

  function conquerIfOppBothDice(gain) {
    updateStateVar('territoriesControlled', gain.qty)
  }

  function conquerAnywhere(gain) {
    updateStateVar('territoriesControlled', gain.qty)
  }

  function conquerBothDice(gain) {
    updateStateVar('territoriesControlled', gain.qty)
  }

  function roll(gain) {}
  function rollNoBenefit(gain) {}
  function regainCurrentSpaceAnyTrack(gain) {}
  function advance(gain) {}
  function regress(gain) {}
  function discardFaceUpTechCards(gain) {}
  function upgradeTech(gain) {}
  function circleTechBenefit(gain) {}
  function squareTechBenefit(gain) {}
  function resetTechTrack(gain) {}
  function newTapestryOverLast(gain) {}
  function scoreCity(gain) {}
  function civ(gain) {}

  // render() {
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
  // }
}

export default Tapestry