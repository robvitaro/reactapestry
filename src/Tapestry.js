import React  from 'react';
import { interpret } from 'xstate';
import City from "./components/City";
import Track from "./components/Track";
import IncomeMat from "./components/IncomeMat";
import SmallHexMap from "./components/SmallHexMap";
import { tapestryGameStateMachine } from "./state_machines/TapestryGameStateMachine";
import { CITIES } from './data/cities';
import { TRACKS } from './data/tracks';

class Tapestry extends React.Component {
  constructor(props) {
    super(props);

    this.state = { current: tapestryGameStateMachine.initialState };

    this.gameStateService = interpret(tapestryGameStateMachine).onTransition(current =>
      this.setState({ current })
    );

    this.handleTrackAdvance = this.handleTrackAdvance.bind(this)
    this.gainBenefitFromAdvancement = this.gainBenefitFromAdvancement.bind(this)
    this.updateStateVar = this.updateStateVar.bind(this)
    this.buildingAdded = this.buildingAdded.bind(this)
    this.handleIncomeTurn = this.handleIncomeTurn.bind(this)
    this.resourceChosen = this.resourceChosen.bind(this)
    this.checkForZeroResources = this.checkForZeroResources.bind(this)
  }

  componentDidMount() {
    this.gameStateService.start();
  }

  componentWillUnmount() {
    this.gameStateService.stop();
  }

  // VP conditions
  explorationTrackAdvances() { return this.state.current.context.trackIndex[0]}
  scienceTrackAdvances() { return this.state.current.context.trackIndex[1]}
  technologyTrackAdvances() { return this.state.current.context.trackIndex[2]}
  militaryTrackAdvances() { return this.state.current.context.trackIndex[3]}
  territoriesOwned() { return this.state.current.context.territoriesOwned}
  territoriesControlled() { return this.state.current.context.territoriesControlled}
  marketsInCity() { return 5 - this.state.current.context.incomeIndex[0]}
  housesInCity() { return 5 - this.state.current.context.incomeIndex[1]}
  farmsInCity() { return 5 - this.state.current.context.incomeIndex[2]}
  armoriesInCity() { return 5 - this.state.current.context.incomeIndex[3]}
  techCards() { return this.state.current.context.techCardBottom + this.state.current.context.techCardMiddle + this.state.current.context.techCardTop}
  offTrackAdvancement() { return 0 }
  tapestryAll() { return this.state.current.context.tapestryHand + this.state.current.context.tapestryMat }
  flat() { return 1 }

  handleIncomeTurn() {
    this.gameStateService.send('IncomeTurn')
  }

  resourceChosen(resource) {
    switch (resource) {
      case 'food': return this.updateStateVar('food', -1, ()=> this.checkForZeroResources())
      case 'worker': return this.updateStateVar('workers', -1, ()=> this.checkForZeroResources())
      case 'coin': return this.updateStateVar('coin', -1, ()=> this.checkForZeroResources())
      case 'culture': return this.updateStateVar('culture', -1, ()=> this.checkForZeroResources())
      default: return null
    }
  }

  checkForZeroResources() {
    if (!this.checkAnyResource(1)) {this.setState({mode: 'zeroResources'})}
  }

  handleTrackAdvance(index) {
    const newTrackIndex = [...this.state.current.context.trackIndex]; // copy so we don't mutate state directly
    newTrackIndex[index] = this.state.current.context.trackIndex[index] + 1;
    this.setState({ trackIndex: newTrackIndex }, ()=> this.gainBenefitFromAdvancement(index));
  }

  gainBenefitFromAdvancement(index) {
    const track = TRACKS[index]
    const space = track.spaces[this.state.current.context.trackIndex[index]]
    const gains = space.gain
    gains.map((gain) => {
      return this[gain.type](gain) // calls function with same name as type
    })
  }

  checkAnyResource(minimum, exclude) {
    let totalResources = 0
    if(exclude !== 'food') { totalResources += this.state.current.context.food }
    if(exclude !== 'workers') { totalResources += this.state.current.context.workers }
    if(exclude !== 'coin') { totalResources += this.state.current.context.coin }
    if(exclude !== 'culture') { totalResources += this.state.current.context.culture }
    return totalResources >= minimum
  }

  checkTrackAdvancePermitted(trackIndex, trackResource) {
    if(this.state.current.context.trackIndex[trackIndex] < 3) {
      /* Age 1 requires 1 resource of any kind */
      return this.checkAnyResource(1, '')
    } else if(this.state.current.context.trackIndex[trackIndex] < 6) {
      /* Age 2 requires 1 track resource and 1 resource of any kind */
      return this.state.current.context[trackResource] >= 2 || (this.state.current.context[trackResource] === 1 && this.checkAnyResource(1, trackResource))
    } else if(this.state.current.context.trackIndex[trackIndex] < 9) {
      /* Age 3 requires 1 track resource and 2 resources of any kind */
      return this.state.current.context[trackResource] >= 3 ||
            (this.state.current.context[trackResource] === 2 && this.checkAnyResource(1, trackResource)) ||
            (this.state.current.context[trackResource] === 1 && this.checkAnyResource(2, trackResource))
    } else if(this.state.current.context.trackIndex[trackIndex] < 12) {
      /* Age 4 requires 2 track resources */
      return this.state.current.context[trackResource] > 1
    }
  }

  buildingAdded() {
    this.setState({mode: ''})
  }

  updateStateVar(field, value, callback) {
    this.setState(prevState => { return { [field]: prevState[field] + value}}, callback)
  }

  territory(gain) {
    this.updateStateVar('territoriesOwned', gain.qty)
  }

  explore(gain) {
    this.updateStateVar('territoriesOwned', gain.qty * -1)
    this.updateStateVar('territoriesExplored', gain.qty)
  }

  exploreAnywhere(gain) {
    this.updateStateVar('territoriesOwned', gain.qty * -1)
    this.updateStateVar('territoriesExplored', gain.qty)
  }

  vp(gain) {
    this.updateStateVar('vp', gain.qty * this[gain.condition]())
  }

  spaceTile(gain) {
    this.updateStateVar('spaceTilesOwned', gain.qty)
  }

  exploreSpace(gain) {
    this.updateStateVar('spaceTilesOwned', gain.qty * -1)
    this.updateStateVar('spaceTilesExplored', gain.qty)
  }

  techCard(gain) {
    this.updateStateVar('techCardBottom', gain.qty)
  }

  tapestry(gain) {
    this.updateStateVar('tapestryHand', gain.qty)
  }

  updateIncomeIndex(index, qty) {
    const newIncomeIndex = [...this.state.current.context.incomeIndex]; // copy so we don't mutate state directly
    newIncomeIndex[index] = this.state.current.context.incomeIndex[index] - qty;
    this.setState({ incomeIndex: newIncomeIndex });
  }

  market(gain) {
    this.updateIncomeIndex(0, gain.qty)
    this.setState({mode: 'adding-m'})
  }

  house(gain) {
    this.updateIncomeIndex(1, gain.qty)
    this.setState({mode: 'adding-h'})
  }

  farm(gain) {
    this.updateIncomeIndex(2, gain.qty)
    this.setState({mode: 'adding-f'})
  }

  armory(gain) {
    this.updateIncomeIndex(3, gain.qty)
    this.setState({mode: 'adding-a'})
  }

  coin(gain) {
    this.updateStateVar('coin', gain.qty)
  }

  worker(gain) {
    this.updateStateVar('workers', gain.qty)
  }

  food(gain) {
    this.updateStateVar('food', gain.qty)
  }

  culture(gain) {
    this.updateStateVar('culture', gain.qty)
  }

  conquer(gain) {
    this.updateStateVar('territoriesControlled', gain.qty)
  }

  conquerIfOppBothDice(gain) {
    this.updateStateVar('territoriesControlled', gain.qty)
  }

  conquerAnywhere(gain) {
    this.updateStateVar('territoriesControlled', gain.qty)
  }

  conquerBothDice(gain) {
    this.updateStateVar('territoriesControlled', gain.qty)
  }

  roll(gain) {}
  rollNoBenefit(gain) {}
  regainCurrentSpaceAnyTrack(gain) {}
  advance(gain) {}
  regress(gain) {}
  discardFaceUpTechCards(gain) {}
  upgradeTech(gain) {}
  circleTechBenefit(gain) {}
  squareTechBenefit(gain) {}
  resetTechTrack(gain) {}
  newTapestryOverLast(gain) {}
  scoreCity(gain) {}
  civ(gain) {}

  render() {
    const {trackIndex, incomeIndex, food, workers, coin, culture, mode, canTakeIncomeTurn} = this.state.current.context
    return (
      <div>
        <div>
          {
            TRACKS.map((track, index) => {
              return <Track
                key={track.name}
                track={track}
                index={index}
                currentSpace={trackIndex[index]}
                handleAdvance={this.handleTrackAdvance}
                advancePermitted={this.checkTrackAdvancePermitted(index, track.resource)}
              />
            })
          }
        </div>
        <div>
          <button onClick={()=>this.handleIncomeTurn()} disabled={!canTakeIncomeTurn}>Take Income Turn</button>
        </div>
        <div>
          <IncomeMat
            incomeTracks={incomeIndex}
            resources={{food: food,
                        workers: workers,
                        coin: coin,
                        culture: culture
                      }}
            mode={mode}
            resourceChosen={this.resourceChosen}
          />
          <City
            city={CITIES[1]}
            index={1}
            mode={mode}
            buildingAdded={this.buildingAdded}
          />
        </div>
        <SmallHexMap />
      </div>
    )
  }
}

export default Tapestry