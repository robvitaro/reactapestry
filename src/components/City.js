import React from 'react';
import {IMAGES} from "../data/images";

const CITY_WIDTH = 9
const CITY_HEIGHT = 9

class City extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: props.city,
      index: props.index,
      cityGrid: null,
      freeResourceGrid: [[0, 0, 0],[0, 0, 0],[0, 0, 0]],
      buildingAdded: props.buildingAdded
    }
    this.addBuilding = this.addBuilding.bind(this)
    this.calculateCompletedLines = this.calculateCompletedLines.bind(this)
  }

  componentDidMount() {
    if (!this.state.cityGrid) {
      const newCityGrid = new Array(CITY_WIDTH)

      for (let i = 0; i < CITY_WIDTH; i++) {
        newCityGrid[i] = new Array(CITY_HEIGHT);
      }

      const newFreeResourceGrid = [...this.state.freeResourceGrid];

      this.state.city.dots.forEach((dot) => {
        newCityGrid[dot[0]][[dot[1]]] = 'd'
        const rX = Math.floor(dot[0]/3)
        const rY = Math.floor(dot[1]/3)
        newFreeResourceGrid[rX][rY] = newFreeResourceGrid[rX][rY] + 1
      })

      this.setState({cityGrid: newCityGrid, freeResourceGrid: newFreeResourceGrid})
    }
  }

  calculateCompletedLines() {
    let completedLines = 0
    this.state.cityGrid.forEach(column => {
      const filteredColumn = column.filter(obj => obj) // removes undefined
      if (filteredColumn.length === CITY_HEIGHT) completedLines += 1
    })

    const transposed = this.state.cityGrid[0].map((col,i) => this.state.cityGrid.map(row => row[i]))

    transposed.forEach(column => {
      const filteredColumn = column.filter(obj => obj) // removes undefined
      if (filteredColumn.length === CITY_HEIGHT) completedLines += 1
    })

    return completedLines
  }

  addBuilding(event) {
    if (this.props.advanceTurnState && this.props.advanceTurnState.state.matches('PlacingBuilding')) {
      const [x,y] = event.target.id.split('_')
      const building = this.props.advanceTurnState.state.context.building.charAt(0)

      const newCityGrid = [...this.state.cityGrid];
      newCityGrid[x][y] = building

      const newFreeResourceGrid = [...this.state.freeResourceGrid];
      const rX = Math.floor(x/3)
      const rY = Math.floor(y/3)
      newFreeResourceGrid[rX][rY] = newFreeResourceGrid[rX][rY] + 1

      this.setState({cityGrid: newCityGrid, freeResourceGrid: newFreeResourceGrid})
      this.state.buildingAdded(newFreeResourceGrid[rX][rY] === 9, this.calculateCompletedLines())
    }
  }

  message() {
    if (this.props.advanceTurnState && this.props.advanceTurnState.state.matches('PlacingBuilding')) {
      const building = this.props.advanceTurnState.state.context.building
      return <span>Please add <img className='icon-in-text' src={IMAGES[building]} alt={building}/> to your city</span>
    } else {
      return <span>&nbsp;</span>
    }
  }

  addingBuildingClass() {
    if (this.props.advanceTurnState && this.props.advanceTurnState.state.matches('PlacingBuilding')) {
      const building = this.props.advanceTurnState.state.context.building.charAt(0)
      return `adding-${building}`
    } else {
      return ''
    }
  }

  render() {
    const rows = []

    if(this.state.cityGrid != null) {
      for (let y = 0; y < CITY_HEIGHT; y++) {
        rows.push(
          <tr key={`cityRow_${y}`}>
            {
              this.state.cityGrid.map((x, index) => {
                return (
                  <td key={`cityCell_${index}_${y}`}>
                    <div
                      id={`${index}_${y}`}
                      className={this.state.cityGrid[index][y] ? this.state.cityGrid[index][y] : this.addingBuildingClass()}
                      onClick={this.addBuilding}
                    />
                  </td>
                )
              })
            }
          </tr>
        )
      }
    }

    return (
      <div className='city'>
        <p className={'smallMessage animated pulse'}>{this.message()}</p>
        <table>
          <tbody>
          {rows}
          </tbody>
        </table>
        <h4>{this.state.index}: {this.state.city.name.toUpperCase()}</h4>
      </div>
    )
  }
}

export default City
