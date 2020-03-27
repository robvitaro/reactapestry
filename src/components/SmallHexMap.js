import React, {useContext, useState} from 'react'
import Hex from './Hex'
import {defineGrid, extendHex} from "honeycomb-grid";
import {HEX_MAP_SMALL} from "../data/hex_map_small";
import {IMAGES} from "../data/images";
import {getSidesForTileID} from '../data/tiles'
import TapestryContext from "./TapestryContext";

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

const SmallHexMap = () => {
  const {gameStateService} = useContext(TapestryContext);
  const advanceTurnState = gameStateService.children.get('advanceTurn')

  const hexFactory = extendHex({
    size: 24,
    orientation: 'flat',
    rotation: 0
  })
  const hexGrid = defineGrid(hexFactory)
  const startingTiles = hexGrid.hexagon({
    radius: 3,
    center: [3, 3]
  })
  let unwantedTiles = [[0,2],[3,6],[6,2]]
  unwantedTiles.map(element => startingTiles.splice(startingTiles.indexOf(element), 1))

  HEX_MAP_SMALL.visible.forEach((tile) => {
    let hex = startingTiles.get(tile)
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

  const [mapInfo, showMapInfo] = useState('main')
  const [currentTile, setCurrentTile] = useState([-1,-1])
  const [mouse, setMouse] = useState([0,0])
  const [displayedTiles, setDisplayedTiles] = useState(startingTiles)
  const [mapSize, setMapSize] = useState(300)  // 500 for zoom
  const [mapZoomOffset, setMapZoomOffset] = useState(1) // .6 for size 500
  const [addingTileRotation, setAddingTileRotation] = useState(0)

  const exploring = advanceTurnState?.state?.children?.explore?.state?.matches('Exploring')
  const addingTile = exploring ? advanceTurnState.state?.children?.explore?.state?.context.tile : 0

  const currentlyAddingTile = () => {
    return addingTile > 0
  }

  const gainVP = (value) => {
    gameStateService.send({type: 'gainVP', value: value})
  }

  const explored = () => {
    gameStateService.send({type: 'explored'})
  }

  const calculateCurrentTile = (event) => {
    let x = (event.nativeEvent.offsetX * mapZoomOffset) + HEX_GLOBAL_OFFSET_X
    let y = (event.nativeEvent.offsetY * mapZoomOffset) + HEX_GLOBAL_OFFSET_Y
    setMouse([x,y])

    let hex = hexGrid.pointToHex([x, y])
    let coordinates = hex.coordinates()
    if(displayedTiles.get(hex.coordinates()) !== undefined) {
      setCurrentTile([coordinates.x, coordinates.y])
    } else {
      setCurrentTile([-1, -1])
    }
  }

  const currentTileIsOnTheBoard = () => {
    return currentTile[0] !== -1 && currentTile[1] !== -1
  }

  const tileIsCurrentTile = (hex) => {
    return currentTile[0] === hex.x && currentTile[1] === hex.y
  }

  const placeTile = (event) => {
    let hex = displayedTiles.get(currentTile)

    if (currentlyAddingTile() && !hex.image && currentTileIsOnTheBoard()) {
      const sides = rotateSides(getSidesForTileID(addingTile), addingTileRotation)
      hex.set({x: hex.x, y: hex.y, start: hex.start, sides: sides, image: `tile_${addingTile}`, rotation: addingTileRotation})
      setAddingTileRotation(0)
      gainVP(determineVPFromPlacement(displayedTiles, currentTile, addingTile, addingTileRotation))
      explored()
    }
  }

  const rotatePlaceTile = (event) => {
    event.preventDefault()
    if (currentlyAddingTile() && currentTileIsOnTheBoard()) {
      const newRotation = addingTileRotation === 5 ? 0 : addingTileRotation + 1
      setAddingTileRotation(newRotation)
    }
  }

  const handleZoom = () => {
    if (mapSize === 300) {
     setMapSize(500)
     setMapZoomOffset(0.6)
    } else {
      setMapSize(300)
      setMapZoomOffset(1)
    }
  }

    // const currentNeighbors = this.currentTileIsOnTheBoard() ? displayedTiles.neighborsOf(displayedTiles.get(current)) : []

  const hexes = displayedTiles.map(hex => {
    const position = hex.toPoint()
    let start = hex.start ? hex.start : null
    let sides = hex.sides ? hex.sides : [[],[],[],[],[],[]]
    let rotation = (!hex.image && currentlyAddingTile() && tileIsCurrentTile(hex)) ? addingTileRotation : hex.rotation
    let image = hex.image ? hex.image : (currentlyAddingTile() && tileIsCurrentTile(hex) ? `tile_${addingTile}` : '')
    const vp = (!hex.image && currentlyAddingTile() && tileIsCurrentTile(hex)) ? determineVPFromPlacement(displayedTiles, currentTile, addingTile, addingTileRotation) : ''
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
        show={mapInfo}
        image={image}
        rotation={rotation}
        vp={vp}
      />
    )
  })

  const debugMenu = (
    <div>
      <select onChange={(e) => showMapInfo(e.target.value)}>
        <option value={'main'}>Main Map</option>
        <option value={'axial'}>Axial Coords</option>
        <option value={'cube'}>Cube Coords</option>
        <option value={'land'}>Land Values</option>
        <option value={'start'}>Start Tiles</option>
      </select>
    </div>
  )

  const zoomButton = <button onClick={handleZoom}>{mapSize === 300 ? 'Zoom in' : 'Zoom out'}</button>

  return(
    <div className='map-wrapper'>
      <div id='map' className='map'>
        <img src={IMAGES['small_map_back']} width={mapSize} alt='Small Map' />
        <svg onClick={placeTile} onContextMenu={rotatePlaceTile} onMouseMove={calculateCurrentTile} viewBox="0 0 300 300" width={mapSize}>
          {hexes}
          <text transform={'translate(0 290)'}>{`Mouse: ${mouse}`}</text>
          <text transform={'translate(250 290)'}>{`Hex: ${currentTile}`}</text>
        </svg>
        {debugMenu}
        {zoomButton}
      </div>
    </div>
  )
}

export default SmallHexMap