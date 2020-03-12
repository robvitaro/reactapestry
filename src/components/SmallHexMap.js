import React from 'react'
import Hex from './Hex'
import {defineGrid, extendHex} from "honeycomb-grid";
import {HEX_MAP_SMALL} from "../data/hex_map_small";
import {IMAGES} from "../data/images";

export const HEX_GLOBAL_OFFSET_X = -20
export const HEX_GLOBAL_OFFSET_Y = 6

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

    HEX_MAP_SMALL.visible.forEach((tile) => {
      let hex = displayedTiles.get(tile)
      if(tile.x === hex.x && tile.y === hex.y) {
        let start = undefined
        if (tile.start) { start = tile.start }
        let sides = []
        tile.sides.forEach((side) => {
          sides.push(side)
        })
        let image = `sm_${tile.x}_${tile.y}`
        hex.set({x: hex.x, y: hex.y, start: start, sides: sides, image: image})
      }
    })

    this.state = {
      show: 'main',
      current: [-1,-1],
      mouse: [0,0],
      Grid: Grid,
      displayedTiles: displayedTiles,
      size: 300,     // 500 for zoom
      zoomOffset: 1, // .6 for size 500
      addingTile: 1
    }
    this.updateMap = this.updateMap.bind(this)
    this.setCurrentTile = this.setCurrentTile.bind(this)
    this.placeTile = this.placeTile.bind(this)
  }

  updateMap(event) {
    const {value} = event.target
    this.setState({show: value})
  }

  setCurrentTile(event) {
    let x = (event.nativeEvent.offsetX * this.state.zoomOffset) + HEX_GLOBAL_OFFSET_X
    let y = (event.nativeEvent.offsetY * this.state.zoomOffset) + HEX_GLOBAL_OFFSET_Y
    this.setState({mouse: [x,y]})

    let hex = this.state.Grid.pointToHex([x, y])
    let coordinates = hex.coordinates()
    if(this.state.displayedTiles.get(hex.coordinates()) !== undefined) {
      this.setState({current: [coordinates.x, coordinates.y]})
    } else {
      this.setState({current: [-1, -1]})
    }
  }

  placeTile(event) {
    if (this.state.current[0] !== -1 && this.state.current[1] !== -1) {
      let hex = this.state.displayedTiles.get(this.state.current)
      hex.set({x: hex.x, y: hex.y, start: hex.start, sides: hex.sides, image: `tile_${this.state.addingTile}`})
      this.setState(prevState => { return { addingTile: prevState.addingTile + 1 }});
    }
  }

  render() {
    const {current, displayedTiles} = this.state
    const currentNeighbors = !(current[0] === -1 && current[1] === -1) ? displayedTiles.neighborsOf(displayedTiles.get(current)) : []

    const hexes =  this.state.displayedTiles.map(hex => {
      const position = hex.toPoint()
      let start = hex.start ? hex.start : null
      let sides = hex.sides ? hex.sides : [[],[],[],[],[],[]]
      let image = hex.image ? hex.image : (this.state.addingTile > 0 && this.state.current[0] === hex.x && this.state.current[1] === hex.y ? `tile_${this.state.addingTile}` : '')

      return (
        <Hex
          corners={hex.corners().map(({x, y}) => `${x},${y}`)}
          positionX={position.x}
          positionY={position.y}
          // className={currentNeighbors.some(neigh => neigh?.x === hex.x && neigh?.y === hex.y) ? 'highlight' : ''}
          // className={this.state.current[0] === hex.x && this.state.current[1] === hex.y ? 'highlight' : ''}
          x={hex.x}
          y={hex.y}
          q={hex.q}
          r={hex.r}
          s={hex.s}
          sides={sides}
          start={start}
          show={this.state.show}
          image={image}
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
      <div className='map-wrapper'>
        <div id='map' className='map'>
          <img src={IMAGES['small_map_back']} width={this.state.size}/>
          <svg onClick={this.placeTile} onMouseMove={this.setCurrentTile} viewBox="0 0 300 300" width={this.state.size}>
            {hexes}
            <text transform={'translate(0 290)'}>{`Mouse: ${this.state.mouse}`}</text>
            <text transform={'translate(250 290)'}>{`Hex: ${this.state.current}`}</text>
          </svg>
          {debugMenu}
        </div>
      </div>
    )
  }
}

export default SmallHexMap