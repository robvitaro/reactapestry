import React, {useContext} from 'react';
import City from "./components/City";
import IncomeMat from "./components/IncomeMat";
import Modal from "./components/Modal";
import SmallHexMap from "./components/SmallHexMap";
import { CITIES } from './data/cities';
import TrackStack from "./components/TrackStack";
import TerritoryTiles from "./components/TerritoryTiles";
import TapestryContext from "./components/TapestryContext";

const Tapestry = () => {
  const {currentState, gameStateService} = useContext(TapestryContext);

  const advanceTurnState = () => {
    return gameStateService.children.get('advanceTurn')
  }

  const gainVP = (value) => {
    gameStateService.send({type: 'gainVP', value: value})
  }

  const explored = () => {
    gameStateService.send({type: 'explored'})
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
        />
        <div>VP: {vp}</div>
      </div>
      <Modal />
    </div>
  )
}

export default Tapestry