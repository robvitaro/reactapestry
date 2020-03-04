import React from 'react';
import market from '../img/market.png'
import house from '../img/house.png'
import farm from '../img/farm.png'
import armory from '../img/armory.png'

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

  componentDidMount() {
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
    if (this.props.advanceTurnState && this.props.advanceTurnState.state.matches('PlacingBuilding')) {
      const [x,y] = event.target.id.split('_')
      const building = this.props.advanceTurnState.state.context.building.charAt(0)
      const newGrid = [...this.state.grid];
      newGrid[x][y] = building
      this.setState({grid: newGrid})
      this.state.buildingAdded()
    }
  }

  message() {
    if (this.props.advanceTurnState && this.props.advanceTurnState.state.matches('PlacingBuilding')) {
      switch (this.props.advanceTurnState.state.context.building) {
        case 'market': return <span>Please add <img className='icon-in-text' src={market} /> to your city</span>
        case 'farm': return <span>Please add <img className='icon-in-text' src={farm} /> to your city</span>
        case 'house': return <span>Please add <img className='icon-in-text' src={house} /> to your city</span>
        case 'armory': return <span>Please add <img className='icon-in-text' src={armory} /> to your city</span>
        default: return <span>&nbsp;</span>
      }
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

    if(this.state.grid != null) {
      for (let y = 0; y < this.state.cityHeight; y++) {
        rows.push(
          <tr key={`cityRow_${y}`}>
            {
              this.state.grid.map((x, index) => {
                return (
                  <td key={`cityCell_${index}_${y}`}>
                    <div
                      id={`${index}_${y}`}
                      className={this.state.grid[index][y] ? this.state.grid[index][y] : this.addingBuildingClass()}
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
