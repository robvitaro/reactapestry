import React from 'react';

class City extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: props.city,
      index: props.index,
      cityWidth: 9,
      cityHeight: 9,
      grid: null,
      buildingAdded: props.buildingAdded
    }
    this.addBuilding = this.addBuilding.bind(this)
  }

  componentWillMount() {
    if (!this.state.grid) {
      const theGrid = new Array(this.state.cityWidth)

      for (let i = 0; i < this.state.cityWidth; i++) {
        theGrid[i] = new Array(this.state.cityHeight);
      }

      this.state.city.dots.map((dot) => {
        return theGrid[dot[0]][[dot[1]]] = 'd'
      })

      this.setState({grid: theGrid})
    }
  }

  addBuilding(event) {
    if (this.props.mode !== '') {
      const [x,y] = event.target.id.split('_')
      const building = this.props.mode.split('-')[1]
      const newGrid = [...this.state.grid];
      newGrid[x][y] = building
      this.setState({grid: newGrid})
      this.state.buildingAdded()
    }
  }

  render() {
    const rows = []

    for (let y = 0; y < this.state.cityHeight; y++) {
      rows.push(
        <tr key={`cityRow_${y}`}>
          {
            this.state.grid.map((x, index) => {
              return (
                <td key={`cityCell_${index}_${y}`}>
                  <div
                    id={`${index}_${y}`}
                    className={this.state.grid[index][y] ? this.state.grid[index][y] : this.props.mode}
                    onClick={this.addBuilding}
                  />
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
