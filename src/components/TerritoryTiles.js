import React from "react";
import {IMAGES} from "../data/images";

const TerritoryTiles = props => {
  return(
    props.territories.map(territory =>
      <img id={`tile_${territory}`} src={IMAGES[`tile_${territory}`]} onClick={()=>props.exploringWithTile(territory)}/>
    )
  )
}

export default TerritoryTiles