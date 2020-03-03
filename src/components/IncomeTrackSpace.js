import React from 'react';
import marketToken from '../img/market.png';
import houseToken from '../img/house.png';
import farmToken from '../img/farm.png';
import armoryToken from '../img/armory.png';

const IncomeTrackSpace = (props) => {
  const {space, openSpace, building} = props
  const title = space.name ? space.name : <span>&nbsp;</span>;
  const calculatedClass = openSpace ? 'space' : `space ${building.charAt(0)}`
  const imgSrc = () => {
    switch (building) {
      case 'market': return marketToken;
      case 'house': return houseToken;
      case 'farm': return farmToken;
      case 'armory': return armoryToken;
      default: return null
    }
  }

  return (
    <td>
      <div className={calculatedClass}>
        {openSpace ? title : <img alt={building} src={imgSrc()} />}
      </div>
    </td>
  )
}

export default IncomeTrackSpace;