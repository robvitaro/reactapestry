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
  const {currentState} = useContext(TapestryContext);

  const {vp} = currentState.context

  return (
    <div>
      <SmallHexMap />
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