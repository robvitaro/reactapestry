import React from 'react';

const IncomeTrackSpace = (props) => {
  const {space} = props
  const title = space.name ? space.name : <span>&nbsp;</span>;

  return (
    <td>
      <div className='space'>
        {title}
      </div>
    </td>
  )
}

export default IncomeTrackSpace;