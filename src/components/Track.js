import React, {useContext} from 'react';
import TrackHeaderRow from "./TrackHeaderRow";
import TrackSpace from "./TrackSpace";
import TapestryContext from "./TapestryContext";

const Track = (props) => {
  const {gameStateService} = useContext(TapestryContext);
  const {track, index, visible, currentSpace, advancePermitted} = props
  const disabled = !advancePermitted || currentSpace > 11
  const className = visible ? 'track' : 'track hidden'


  const handleAdvanceTurn =(index) => {
    gameStateService.send({type: 'AdvanceTurn', index: index})
  }

  const advanceButton =  <button onClick={()=>handleAdvanceTurn(index)} disabled={disabled}>ADVANCE</button>

  return (
    <div className={className}>
      <table>
        <thead>
          <TrackHeaderRow track={track} />
        </thead>
        <tbody>
          <tr>
            {
              track.spaces.map((space, index) => {
                return (
                  <TrackSpace
                    key={index}
                    space={space}
                    occupied={index === currentSpace}
                    className={index === 0 ? track.name.toLowerCase() : ''}
                    advanceButton={index === 0 ? advanceButton : undefined}
                  />
                )
              })
            }
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Track;