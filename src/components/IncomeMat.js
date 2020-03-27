import React, {useContext} from 'react';
import {INCOME_MAT} from "../data/income_mat";
import IncomeTrack from "./IncomeTrack";
import {IMAGES} from "../data/images";
import TapestryContext from "./TapestryContext";
import ResourceTrack from "./ResourceTrack";

const IncomeMat = (props) => {
  const {currentState, gameStateService} = useContext(TapestryContext);
  const incomeTracks = currentState.context.incomeIndex
  const {canTakeIncomeTurn} = currentState.context

  const handleIncomeTurn = () => {
    if(canTakeIncomeTurn) gameStateService.send('IncomeTurn')
  }

  return (
    <div>
      <div className='incomeMat income-turn'>
        <img className={canTakeIncomeTurn ? 'income-turn' : 'income-turn-disabled'}
             src={IMAGES['income-turn']}
             alt='Take Income Turn'
             onClick={()=>handleIncomeTurn()}/>
      </div>
      <div className='incomeMat'>
        <div className='incomeMat'>
          <IncomeTrack
            key={INCOME_MAT[0].name}
            incomeTrack={INCOME_MAT[0]}
            buildingsOnTrack={incomeTracks[0]}
            building={'market'}
          />
          <IncomeTrack
            key={INCOME_MAT[1].name}
            incomeTrack={INCOME_MAT[1]}
            buildingsOnTrack={incomeTracks[1]}
            building={'house'}
          />
        </div>
        <div className='incomeMat'>
          <IncomeTrack
            key={INCOME_MAT[2].name}
            incomeTrack={INCOME_MAT[2]}
            buildingsOnTrack={incomeTracks[2]}
            building={'farm'}
          />
          <IncomeTrack
            key={INCOME_MAT[3].name}
            incomeTrack={INCOME_MAT[3]}
            buildingsOnTrack={incomeTracks[3]}
            building={'armory'}
          />
        </div>
        <ResourceTrack />
      </div>
    </div>
  )
}
export default IncomeMat