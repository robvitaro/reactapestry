import React from 'react'
import Hex from './Hex'
import {defineGrid, extendHex} from "honeycomb-grid";
import {HEX_MAP_SMALL} from "../data/hex_map_small";

class SmallHexMap extends React.Component {
  constructor(props) {
    super(props);
    const Hex = extendHex({
      size: 24,
      orientation: 'flat'
    })
    const Grid = defineGrid(Hex)
    const displayedTiles = Grid.hexagon({
      radius: 3,
      center: [3, 3]
    })
    let unwantedTiles = [[0,2],[3,6],[6,2]]
    unwantedTiles.map(element => displayedTiles.splice(displayedTiles.indexOf(element), 1))

    this.state = {show: 'main', current: [1,3], Grid: Grid, displayedTiles: displayedTiles}
    this.updateMap = this.updateMap.bind(this)
    this.setCurrentTile = this.setCurrentTile.bind(this)
  }

  updateMap(event) {
    const {value} = event.target
    this.setState({show: value})
  }

  setCurrentTile(event) {
    let x = event.nativeEvent.offsetX
    let y = event.nativeEvent.offsetY

    let hex = this.state.Grid.pointToHex([x, y])
    let coordinates = hex.coordinates()
    if(this.state.displayedTiles.get(hex.coordinates()) !== undefined) {
      this.setState({current: [coordinates.x, coordinates.y]})
    }
  }

  render() {
    const {current, displayedTiles} = this.state
    const currentNeighbors = !(current[0] === -1 && current[1] === -1) ? displayedTiles.neighborsOf(displayedTiles.get(current)) : []

    const hexes =  this.state.displayedTiles.map(hex => {
      const position = hex.toPoint()
      let start = null
      let sides = [[],[],[],[],[],[]]

      HEX_MAP_SMALL.visible.forEach((tile) => {
        if(tile.x === hex.x && tile.y === hex.y) {
          if (tile.start) { start = tile.start }
          sides = []
          tile.sides.forEach((side) => {
            sides.push(side)
          })
        }
      })

      return (
        <Hex handleMouseMove={this.setCurrentTile}
             corners={hex.corners().map(({x, y}) => `${x},${y}`)}
             positionX={position.x}
             positionY={position.y}
             className={currentNeighbors.some(neigh => neigh?.x === hex.x && neigh?.y === hex.y) ? 'highlight' : ''}
             x={hex.x}
             y={hex.y}
             q={hex.q}
             r={hex.r}
             s={hex.s}
             sides={sides}
             start={start}
             show={this.state.show}
        />
      )
    })

    const debugMenu = (
      <div>
        <select onChange={this.updateMap}>
          <option value={'main'}>Main Map</option>
          <option value={'axial'}>Axial Coords</option>
          <option value={'cube'}>Cube Coords</option>
          <option value={'land'}>Land Values</option>
          <option value={'start'}>Start Tiles</option>
        </select>
      </div>
    )

    return(
      <div id='map' className='map'>
        <svg viewBox="0 0 300 300" width="300">
          {hexes}
        </svg>
        {debugMenu}
      </div>
    )
  }
}

export default SmallHexMap