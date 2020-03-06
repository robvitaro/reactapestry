import React from 'react'
import Hex from './Hex'
import {HexGrid, Layout} from "react-hexgrid";
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

  checkUnwantedTiles(q,r,s) {
    const unwantedTiles = [[-3,0,3],[3,-3,0],[0,3,-3]]
    // check that EVERY unwanted tile's coords != q r s
    return unwantedTiles.every((tile) => {
      return !(tile[0] === q && tile[1] === r && tile[2] === s)
    })
  }

  render() {
    const displayedTiles = []

    for (let q = -3; q <= 3; q++) {
      let r1 = Math.max(-3, -q - 3);
      let r2 = Math.min(3, -q + 3);
      for (let r = r1; r <= r2; r++) {
        let s = -q-r
        if (this.checkUnwantedTiles(q,r,s)) {
          let x = q + 3
          let y = r + 3
          let sides = [[],[],[],[],[],[]]
          let start = null

          HEX_MAP_SMALL.visible.forEach((tile) => {
            if(tile.x === x && tile.y === y) {
              if (tile.start) { start = tile.start }
              sides = []
              tile.sides.forEach((side) => {
                sides.push(side)
              })
            }
          })

          displayedTiles.push(
            <Hex key={`${q}_${r}_${s}_${x}_${y}`}
                 q={q} r={r} s={s} x={x} y={y}
                 start={start}
                 sides={sides}
                 show={this.state.show} />
          )
        }
      }
    }

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

    const hexagonSize = { x: 8, y: 8 };

    return(
      <div className='map'>
        <HexGrid width={350} height={350} viewBox="-50 -50 100 100">
          <Layout size={hexagonSize} flat={true} spacing={1.0} origin={{ x: 0, y: 0 }}>
            {displayedTiles}
          </Layout>
        </HexGrid>
        {debugMenu}
      </div>
    )
  }
}

export default SmallHexMap