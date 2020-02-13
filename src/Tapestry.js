import React  from 'react';
import Track from "./components/Track";
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
      territoriesControlled: 1,
      spaceTilesOwned: 0,
      spaceTilesExplored: 0,
      farmsOnMat: 5,
      housesOnMat: 5,
      marketsOnMat: 5,
      armoriesOnMat: 5,
      farmsInCity: 0,
      housesInCity: 0,
      marketsInCity: 0,
      armoriesCity: 0,
      trackIndex: [0,0,0,0]
    };
    this.handleTrackAdvance = this.handleTrackAdvance.bind(this)
    this.gainBenefitFromAdvancement = this.gainBenefitFromAdvancement.bind(this)
    this.updateStateVar = this.updateStateVar.bind(this)
  }

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
      this[gain.type](gain) // calls function with same name as type
    })
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

  farm(gain) {
    this.updateStateVar('farmsOnMat', gain.qty * -1)
    this.updateStateVar('farmsInCity', gain.qty)
  }

  vp(gain) {
    this.updateStateVar('vp', gain.qty * this.state[gain.condition])
  }

  spaceTile(gain) {
    this.updateStateVar('spaceTilesOwned', gain.qty)
  }

  exploreSpace(gain) {
    this.updateStateVar('spaceTilesOwned', gain.qty * -1)
    this.updateStateVar('spaceTilesExplored', gain.qty)
  }
/*
roll_no_benefit
tapestry
house
roll
regain_current_space_any_track
advance
regress
tech_card
market
discard_face_up_tech_cards
armory
upgrade_tech
square_tech_benefit
coin
worker
culture
food
reset_tech_track
conquer
conquer_if_opp_both_dice
conquer_anywhere
new_tapestry_over_last
score_city
conquer_both_dice
civ
 */


  render() {
    return (
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
    )
  }
}

export default Tapestry