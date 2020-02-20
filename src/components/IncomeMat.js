import React from 'react';
import {INCOME_MAT} from "../data/income_mat";
import IncomeTrack from "./IncomeTrack";
import ResourceTrack from "./ResourceTrack";

const IncomeMat = (props) => {
  const {incomeTracks, resources} = props

  return (
    <div className='incomeMat'>
      <div className='incomeMat'>
        <IncomeTrack
          key={INCOME_MAT[0].name}
          incomeTrack={INCOME_MAT[0]}
          buildingsOnTrack={incomeTracks[0]}
          className={'m'}
        />
        <IncomeTrack
          key={INCOME_MAT[1].name}
          incomeTrack={INCOME_MAT[1]}
          buildingsOnTrack={incomeTracks[1]}
          className={'h'}
        />
      </div>
      <div className='incomeMat'>
        <IncomeTrack
          key={INCOME_MAT[2].name}
          incomeTrack={INCOME_MAT[2]}
          buildingsOnTrack={incomeTracks[2]}
          className={'f'}
        />
        <IncomeTrack
          key={INCOME_MAT[3].name}
          incomeTrack={INCOME_MAT[3]}
          buildingsOnTrack={incomeTracks[3]}
          className={'a'}
        />
      </div>
      <div>
        <ResourceTrack resources={resources}/>
      </div>
    </div>
  )
}
export default IncomeMat