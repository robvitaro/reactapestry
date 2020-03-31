import React, {useContext} from "react";
import {IMAGES} from "../data/images";
import TapestryContext from "./TapestryContext";

const Modal = props => {
  const {gameStateService} = useContext(TapestryContext);
  const advanceTurnState = gameStateService.children.get('advanceTurn')

  const chooseGain = (gain) => {
    gameStateService.send({type: 'chooseOneGain', gains: [gain]})
  }

  const bonusAnswer = (answer) => {
    const type = answer === 'yes' ? 'yesBonus' : 'noBonus'
    gameStateService.send({type: type})
  }

  const show = advanceTurnState?.state?.matches('ChoosingGain') ||
               advanceTurnState?.state?.matches('DecidingBonus') // or other things..

  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return(
    <div className={showHideClassName}>
      <section className="modal-main">
        {advanceTurnState?.state?.matches('ChoosingGain') &&
        <div>
          <h2>Choose:</h2>
          {advanceTurnState.state.context.gains.map(gain => {
            return <img key={gain.type} src={IMAGES[gain['type']]} onClick={()=> chooseGain(gain)} alt={gain['type']}/>
          })
          }
        </div>
        }
        {advanceTurnState?.state?.matches('DecidingBonus') &&
        <div>
          <h2>Would you like to pay for the bonus?</h2>
          <div>
            {`${advanceTurnState.state.context.bonus['cost_qty']} x `}<img key={advanceTurnState.state.context.bonus['cost']} src={IMAGES[advanceTurnState.state.context.bonus['cost']]} alt={advanceTurnState.state.context.bonus['cost']}/> for
            {`${advanceTurnState.state.context.bonus['gain_qty']} x `}<img key={advanceTurnState.state.context.bonus['gain']} src={IMAGES[advanceTurnState.state.context.bonus['gain']]} alt={advanceTurnState.state.context.bonus['gain']}/>
            <button onClick={()=> bonusAnswer('yes')}>Yes</button>
            <button onClick={()=> bonusAnswer('no')}>No</button>
          </div>
        </div>
        }
      </section>
    </div>
  )
}

export default Modal