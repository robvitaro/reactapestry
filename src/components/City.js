import React from 'react';

class City extends React.Component {
  constructor(props) {
    super();
    this.state = {
      city: props.city,
      index: props.index,
      transientClass: props.mode
    }
  }

  render() {
    const cityWidth = 9
    const cityHeight = 9
    const grid = new Array(cityWidth)

    for (let i = 0; i < cityWidth; i++) {
      grid[i] = new Array(cityHeight);
    }

    this.state.city.dots.map((dot) => {
      return grid[dot[0]][[dot[1]]] = 'd'
    })

    const rows = []

    for (let y = 0; y < cityHeight; y++) {
      rows.push(
        <tr key={`cityRow_${y}`}>
          {
            grid.map((x, index) => {
              return (
                <td key={`cityCell_${grid[index]}_${y}`}>
                  <div className={grid[index][y] ? grid[index][y] : this.state.transientClass} />
                </td>
              )
            })
          }
        </tr>
      )
    }

    return (
      <div className='city'>
        <table>
          <tbody>
          {rows}
          </tbody>
        </table>
        <h4>{this.state.index}: {this.state.city.name}</h4>
      </div>
    )
  }
}

export default City
