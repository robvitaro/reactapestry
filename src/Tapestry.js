import React  from 'react';
import City from "./components/City";
import Track from "./components/Track";
import IncomeMat from "./components/IncomeMat";
import SmallHexMap from "./components/SmallHexMap";
import { CITIES } from './data/cities';
import { TRACKS } from './data/tracks';

class Tapestry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vp: 0,
      food: 0,
      workers: 0,
      coin: 0,
      culture: 0,
      tapestryHand: 0,
      tapestryMat: 0,
      techCardBottom: 0,
      techCardMiddle: 0,
      techCardTop: 0,
      territoriesOwned: 0,
      territoriesExplored: 0,
      territoriesControlled: 0,
      spaceTilesOwned: 0,
      spaceTilesExplored: 0,
      trackIndex: [0,0,0,0],
      incomeIndex: [5,5,5,5],
      mode: '',
    };
    this.handleTrackAdvance = this.handleTrackAdvance.bind(this)
    this.gainBenefitFromAdvancement = this.gainBenefitFromAdvancement.bind(this)
    this.updateStateVar = this.updateStateVar.bind(this)
    this.buildingAdded = this.buildingAdded.bind(this)
  }

  // VP conditions
  explorationTrackAdvances() { return this.state.trackIndex[0]}
  scienceTrackAdvances() { return this.state.trackIndex[1]}
  technologyTrackAdvances() { return this.state.trackIndex[2]}
  militaryTrackAdvances() { return this.state.trackIndex[3]}
  territoriesOwned() { return this.state.territoriesOwned}
  territoriesControlled() { return this.state.territoriesControlled}
  marketsInCity() { return 5 - this.state.incomeIndex[0]}
  housesInCity() { return 5 - this.state.incomeIndex[1]}
  farmsInCity() { return 5 - this.state.incomeIndex[2]}
  armoriesInCity() { return 5 - this.state.incomeIndex[3]}
  techCards() { return this.state.techCardBottom + this.state.techCardMiddle + this.state.techCardTop}
  offTrackAdvancement() { return 0 }
  tapestryAll() { return this.state.tapestryHand + this.state.tapestryMat }
  flat() { return 1 }

  handleTrackAdvance(index) {
    const newTrackIndex = [...this.state.trackIndex]; // copy so we don't mutate state directly
    newTrackIndex[index] = this.state.trackIndex[index] + 1;
    this.setState({ trackIndex: newTrackIndex }, ()=> this.gainBenefitFromAdvancement(index));
  }

  gainBenefitFromAdvancement(index) {
    const track = TRACKS[index]
    const space = track.spaces[this.state.trackIndex[index]]
    const gains = space.gain
    gains.map((gain) => {
      return this[gain.type](gain) // calls function with same name as type
    })
  }

  buildingAdded() {
    this.setState({mode: ''})
  }

  updateStateVar(field, value) {
    this.setState(prevState => { return { [field]: prevState[field] + value}})
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
    const newIncomeIndex = [...this.state.incomeIndex]; // copy so we don't mutate state directly
    newIncomeIndex[index] = this.state.incomeIndex[index] - qty;
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
    return (
      <div>
        <div>
          {
            TRACKS.map((track, index) => {
              return <Track
                key={track.name}
                track={track}
                index={index}
                currentSpace={this.state.trackIndex[index]}
                handleAdvance={this.handleTrackAdvance}
              />
            })
          }
        </div>
        <div>
          <IncomeMat incomeTracks={this.state.incomeIndex}/>
          <City
            city={CITIES[4]}
            index={4}
            mode={this.state.mode}
            buildingAdded={this.buildingAdded}
          />
        </div>
        <SmallHexMap />
      </div>
    )
  }
}

export default Tapestry