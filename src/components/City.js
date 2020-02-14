import React from 'react';

const City = (props) => {
  const {city, index} = props
  const cityWidth = 9
  const cityHeight = 9
  const grid = Array(cityWidth)

  for (let i = 0; i < cityWidth; i++) {
    grid[i] = new Array(cityHeight);
  }

  city.dots.map((dot) => {
    return grid[dot[0]][[dot[1]]] = 'd'
  })

  const rows = []

  for (let y = 0; y < cityHeight; y++) {
    rows.push (
      <tr key={`cityRow_${y}`}>
        {
          grid.map((x, index) =>{
            return <td key={`cityCell_${grid[index]}_${y}`}><div className={grid[index][y]}></div></td>
          })
        }
      </tr>
    )
  }

  return (
    <div className='city'>
      <h3>{index}: {city.name}</h3>
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  )
}

export default City
