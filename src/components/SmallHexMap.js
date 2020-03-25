import React from 'react'
import Hex from './Hex'
import {defineGrid, extendHex} from "honeycomb-grid";
import {HEX_MAP_SMALL} from "../data/hex_map_small";
import {IMAGES} from "../data/images";
import {getSidesForTileID} from '../data/tiles'

export const HEX_GLOBAL_OFFSET_X = -20
export const HEX_GLOBAL_OFFSET_Y = 6

export const DIRS = ['N','NE','SE','S','SW','NW']
export const OPPOSITE_DIRS = ['S','SW','NW','N','NE','SE']

export const rotateSides = (sides, rotateTimes) => {
  const newSides = [...sides]
  for(let i = 0; i < rotateTimes; i++) {
    let last = newSides.pop()
    newSides.unshift(last)
  }
  return newSides
}

export const determineVPFromPlacement = (tiles, currentCoords, addingTile, addingTileRotation) => {
  let vp = 0
  const currentHex = tiles.get(currentCoords)
  const addingSides = rotateSides(getSidesForTileID(addingTile), addingTileRotation)
  DIRS.forEach((dir, index) => {
    const hex = tiles.neighborsOf(currentHex, dir)[0]
    if (hex === undefined || hex.sides === undefined) return
    const oppositeDir = OPPOSITE_DIRS[index]
    const oppositeDirIndex = DIRS.indexOf(oppositeDir)
    if(hex.sides[oppositeDirIndex][0] === addingSides[index][1] || hex.sides[oppositeDirIndex][1] === addingSides[index][0]) {
      vp += 1
    }
  })
  return vp
}

class SmallHexMap extends React.Component {
  constructor(props) {
    super(props);
    const Hex = extendHex({
      size: 24,
      orientation: 'flat',
      rotation: 0
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
        hex.set({x: hex.x, y: hex.y, start: start, sides: sides, image: image, rotation: 0})
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
      addingTile: 1,
      addingTileRotation: 0,
      gainVP: props.gainVP
    }

    this.updateMap = this.updateMap.bind(this)
    this.addingTile = this.addingTile.bind(this)
    this.setCurrentTile = this.setCurrentTile.bind(this)
    this.placeTile = this.placeTile.bind(this)
    this.rotatePlaceTile = this.rotatePlaceTile.bind(this)
    this.currentTileIsOnTheBoard = this.currentTileIsOnTheBoard.bind(this)
    this.tileIsCurrentTile = this.tileIsCurrentTile.bind(this)
    this.handleZoom = this.handleZoom.bind(this)
  }

  updateMap(event) {
    const {value} = event.target
    this.setState({show: value})
  }

  addingTile() {
    return this.state.addingTile > 0
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

  currentTileIsOnTheBoard() {
    return this.state.current[0] !== -1 && this.state.current[1] !== -1
  }

  tileIsCurrentTile(hex) {
    return this.state.current[0] === hex.x && this.state.current[1] === hex.y
  }

  placeTile(event) {
    const {current, displayedTiles, addingTile, addingTileRotation} = this.state
    let hex = displayedTiles.get(current)

    if (this.addingTile() && !hex.image && this.currentTileIsOnTheBoard()) {
      const sides = rotateSides(getSidesForTileID(addingTile), addingTileRotation)
      hex.set({x: hex.x, y: hex.y, start: hex.start, sides: sides, image: `tile_${addingTile}`, rotation: addingTileRotation})
      this.setState(prevState => { return { addingTile: prevState.addingTile + 1, addingTileRotation: 0 }});
      this.state.gainVP(determineVPFromPlacement(displayedTiles, current, addingTile, addingTileRotation))
    }
  }

  rotatePlaceTile(event) {
    event.preventDefault()
    if (this.addingTile() && this.currentTileIsOnTheBoard()) {
      const newRotation = this.state.addingTileRotation === 5 ? 0 : this.state.addingTileRotation + 1
      this.setState({ addingTileRotation: newRotation });
    }
  }

  handleZoom() {
    if (this.state.size === 300) {
      this.setState({size: 500, zoomOffset: 0.6})
    } else {
      this.setState({size: 300, zoomOffset: 1})
    }
  }

  render() {
    const {addingTile, addingTileRotation, current, displayedTiles} = this.state
    // const currentNeighbors = this.currentTileIsOnTheBoard() ? displayedTiles.neighborsOf(displayedTiles.get(current)) : []

    const hexes =  this.state.displayedTiles.map(hex => {
      const position = hex.toPoint()
      let start = hex.start ? hex.start : null
      let sides = hex.sides ? hex.sides : [[],[],[],[],[],[]]
      let rotation = (!hex.image && this.addingTile() && this.tileIsCurrentTile(hex)) ? addingTileRotation : hex.rotation
      let image = hex.image ? hex.image : (this.addingTile() && this.tileIsCurrentTile(hex) ? `tile_${addingTile}` : '')
      const vp = (!hex.image && this.addingTile() && this.tileIsCurrentTile(hex)) ? determineVPFromPlacement(displayedTiles, current, addingTile, addingTileRotation) : ''
      return (
        <Hex
          key={`hex_${hex.x}_${hex.y}`}
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
          rotation={rotation}
          vp={vp}
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

    const zoomButton = <button onClick={this.handleZoom}>{this.state.size === 300 ? 'Zoom in' : 'Zoom out'}</button>

    return(
      <div className='map-wrapper'>
        <div id='map' className='map'>
          <img src={IMAGES['small_map_back']} width={this.state.size} alt='Small Map' />
          <svg onClick={this.placeTile} onContextMenu={this.rotatePlaceTile} onMouseMove={this.setCurrentTile} viewBox="0 0 300 300" width={this.state.size}>
            {hexes}
            <text transform={'translate(0 290)'}>{`Mouse: ${this.state.mouse}`}</text>
            <text transform={'translate(250 290)'}>{`Hex: ${this.state.current}`}</text>
          </svg>
          {debugMenu}
          {zoomButton}
        </div>
      </div>
    )
  }
}

export default SmallHexMap