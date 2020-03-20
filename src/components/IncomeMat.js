import React from 'react';
import {INCOME_MAT} from "../data/income_mat";
import IncomeTrack from "./IncomeTrack";

const IncomeMat = (props) => {
  const {incomeTracks, resourceTrack} = props

  return (
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
      {resourceTrack}
    </div>
  )
}
export default IncomeMat