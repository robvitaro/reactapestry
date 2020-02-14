import React from 'react';
import IncomeTrackSpace from "./IncomeTrackSpace";

const IncomeTrack = (props) => {
  const {incomeTrack} = props

  return (
    <div>
      <table>
        <tbody>
          <tr>
            {
              incomeTrack.spaces.map((space, index) => {
                return (
                  <IncomeTrackSpace
                    key={index}
                    space={space}
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

export default IncomeTrack;