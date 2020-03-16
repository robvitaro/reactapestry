import React, {useState} from 'react';

const IncomeTrackSpace = (props) => {
  const {space, openSpace, building, images} = props
  const title = space.name ? space.name : <span>&nbsp;</span>;
  const calculatedClass = openSpace ? 'space' : `space ${building.charAt(0)}`
  const incomeImages = images.map((image, index) => <img key={`${space.name}_${index}`} src={image} alt={space.images[index]} />)
  const [isShown, setIsShown] = useState(false);

  return (
    <td>
      <div className={calculatedClass} onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
        { (openSpace || isShown) && (<div className='incomeImage'>{incomeImages}</div>)}
        { (openSpace || isShown) && (<div className='label'>{title.toUpperCase()}</div>)}
      </div>
    </td>
  )
}

export default IncomeTrackSpace;