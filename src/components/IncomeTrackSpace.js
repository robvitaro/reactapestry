import React from 'react';

const IncomeTrackSpace = (props) => {
  const {space, openSpace, building, images} = props
  const title = space.name ? space.name : <span>&nbsp;</span>;
  const calculatedClass = openSpace ? 'space' : `space ${building.charAt(0)}`
  const incomeImages = images.map((image, index) => <img src={image} alt={space.images[index]} />)

  const content = openSpace ? (
    <div className={calculatedClass}>
      <div className='incomeImage'>{incomeImages}</div>
      <div className='label'>{title.toUpperCase()}</div>
    </div>
  ) : <div className={calculatedClass} />

  return (
    <td>
      {content}
    </td>
  )
}

export default IncomeTrackSpace;