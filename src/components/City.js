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
      <tr>
        {
          grid.map((x, index) =>{
            return <td>{grid[index][y] ? grid[index][y] : '_'}</td>
          })
        }
      </tr>
    )
  }

  return (
    <div>
      <h3>{index}: {city.name}</h3>
      <table border={1}>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  )
}

export default City
