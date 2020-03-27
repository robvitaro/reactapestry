import React, {useContext} from "react";
import {IMAGES} from "../data/images";
import TapestryContext from "./TapestryContext";

const Modal = props => {
  const {gameStateService} = useContext(TapestryContext);
  const advanceTurnState = gameStateService.children.get('advanceTurn')

  const chooseGain = (gain) => {
    gameStateService.send({type: 'chooseOneGainFromAdvance', gains: [gain]})
  }

  const show = advanceTurnState?.state?.matches('ChoosingGain') // or other things..

  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return(
    <div className={showHideClassName}>
      <section className="modal-main">
        {advanceTurnState?.state?.matches('ChoosingGain') &&
        <div>
          <h2>Choose:</h2>
          {advanceTurnState.state.context.gains.map(gain => {
            return <img src={IMAGES[gain['type']]} onClick={()=> chooseGain(gain)}/>
          })
          }
        </div>
        }
      </section>
    </div>
  )
}

export default Modal