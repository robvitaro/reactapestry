import React from 'react';
import {INCOME_MAT} from "../data/income_mat";
import IncomeTrack from "./IncomeTrack";

const IncomeMat = (props) => {
  return (
    <div className='incomeMat'>
      <div className='incomeMat'>
        <IncomeTrack
          key={INCOME_MAT[0].name}
          incomeTrack={INCOME_MAT[0]}
          index={0}
        />
        <IncomeTrack
          key={INCOME_MAT[1].name}
          incomeTrack={INCOME_MAT[1]}
          index={1}
        />
      </div>
      <div className='incomeMat'>
        <IncomeTrack
          key={INCOME_MAT[2].name}
          incomeTrack={INCOME_MAT[2]}
          index={2}
        />
        <IncomeTrack
          key={INCOME_MAT[3].name}
          incomeTrack={INCOME_MAT[3]}
          index={3}
        />
      </div>
    </div>
  )
}
export default IncomeMat