import React from 'react'
// import Hex from './Hex'
import {defineGrid, extendHex} from "honeycomb-grid";
import {HEX_MAP_SMALL} from "../data/hex_map_small";

class SmallHexMap extends React.Component {
  constructor(props) {
    super(props);
    const Hex = extendHex({
      size: 24,
      orientation: 'flat'
    })
    this.state = {show: 'axial', current: [1,3], Grid: defineGrid(Hex)}
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
    this.setState({current: [coordinates.x, coordinates.y]})
  }

  render() {
    const displayedTiles = this.state.Grid.hexagon({
      radius: 3,
      center: [3, 3]
    })
    let unwantedTiles = [[0,2],[3,6],[6,2]]
    unwantedTiles.map(element => displayedTiles.splice(displayedTiles.indexOf(element), 1))

    const currentNeighbors = this.state.current !== [-1,-1] ? displayedTiles.neighborsOf(displayedTiles.get(this.state.current)) : []

    const hexes =  displayedTiles.map(hex => {
      const position = hex.toPoint()
      return (
      <g >
        <polygon onMouseMove={this.setCurrentTile}
                 points={hex.corners().map(({x, y}) => `${x},${y}`)}
                 transform={`translate(${position.x} ${position.y})`}
                 fill="#ffffff" stroke="darkgray" strokeWidth='1'
                 className={currentNeighbors.some(neigh => neigh?.x === hex.coordinates().x && neigh?.y === hex.coordinates().y) ? 'highlight' : ''}/>
        <text x={position.x} y={position.y} style={{fontSize: '8pt'}} transform={`translate(12 20)`} stroke="darkgray">{`${hex.x},${hex.y}`}</text>
      </g>
      )
    })

    const debugMenu = (
      <div>
        <select onChange={this.updateMap}>
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

        {/*<HexGrid width={350} height={350} viewBox="-50 -50 100 100">*/}
        {/*  <Layout size={hexagonSize} flat={true} spacing={1.0} origin={{ x: 0, y: 0 }}>*/}
        {/*    {displayedTiles}*/}
        {/*  </Layout>*/}
        {/*</HexGrid>*/}
        {debugMenu}
      </div>
    )
  }
}

export default SmallHexMap