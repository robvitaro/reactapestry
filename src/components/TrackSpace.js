import React, {useState, useEffect} from 'react';

const TrackSpace = (props) => {
  const {space} = props
  const {currentSpace} = props
  const {slot} = props
  const [occupied, setOccupied] = useState(false);

  useEffect(() => {
    setOccupied(currentSpace === slot);
  }, [currentSpace, slot]);

  return (
    <td>
      {space.name}
      <br/>
      {occupied ? 'X' : '_'}
    </td>
  )
}

export default TrackSpace;