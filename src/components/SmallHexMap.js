import React from 'react'
// import Hex from './Hex'
import {defineGrid, extendHex} from "honeycomb-grid";
import {HEX_MAP_SMALL} from "../data/hex_map_small";

class SmallHexMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show: 'axial'}
    this.updateMap = this.updateMap.bind(this)
  }

  updateMap(event) {
    const {value} = event.target
    this.setState({show: value})
  }

  render() {
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

    const hexes =  displayedTiles.map(hex => {
      const position = hex.toPoint()

      return (
      <g >
        <polygon points={hex.corners().map(({x, y}) => `${x},${y}`)} transform={`translate(${position.x} ${position.y})`} fill="#ffffff" stroke="darkgray" strokeWidth='1'/>
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