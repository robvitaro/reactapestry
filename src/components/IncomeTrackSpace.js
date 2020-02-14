import React from 'react';

const IncomeTrackSpace = (props) => {
  const {space, openSpace, className} = props
  const title = space.name ? space.name : <span>&nbsp;</span>;
  const calculatedClass = openSpace ? 'space' : `space ${className}`

  return (
    <td>
      <div className={calculatedClass}>
        {openSpace ? title : ''}
      </div>
    </td>
  )
}

export default IncomeTrackSpace;