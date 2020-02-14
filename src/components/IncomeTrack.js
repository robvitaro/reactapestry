import React from 'react';
import IncomeTrackSpace from "./IncomeTrackSpace";

const IncomeTrack = (props) => {
  const {incomeTrack, buildingsOnTrack, className} = props

  return (
    <div>
      <table>
        <tbody>
          <tr>
            {
              incomeTrack.spaces.map((space, index) => {
                let openSpace = index < 6 - buildingsOnTrack
                return (
                  <IncomeTrackSpace
                    key={index}
                    space={space}
                    openSpace={openSpace}
                    className={className}
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