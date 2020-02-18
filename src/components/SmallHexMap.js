import React from 'react'
import Hex from './Hex'
import {HexGrid, Layout} from "react-hexgrid";

class SmallHexMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show: 'cube'}
    this.updateMap = this.updateMap.bind(this)
  }

  updateMap(event) {
    const {value} = event.target
    this.setState({show: value})
  }

  checkUnwantedTiles(q,r,s) {
    const unwantedTiles = [[-3,0,3],[3,-3,0],[0,3,-3]]
    let ok = true
    unwantedTiles.map((tile) => {
      if(tile[0] === q && tile[1] === r && tile[2] === s) {
        ok = false
      }
    })
    return ok
  }

  checkStartTiles(x,y) {
    const startTiles = [[3,1],[1,5],[5,3]]
    let className = ''
    startTiles.map((tile) => {
      if(tile[0] === x && tile[1] === y) {
        className = 'start'
      }
    })
    return className
  }

  render() {

    const tiles = []

    for (let q = -3; q <= 3; q++) {
      let r1 = Math.max(-3, -q - 3);
      let r2 = Math.min(3, -q + 3);
      for (let r = r1; r <= r2; r++) {
        let s = -q-r
        if (this.checkUnwantedTiles(q,r,s)) {
          let x = q + 3
          let y = r + 3
          tiles.push(
            <Hex q={q} r={r} s={s} x={x} y={y} start={this.checkStartTiles(x,y)} show={this.state.show} />
          )
        }
      }
    }

    const debugMenu = (
      <div>
        <select onChange={this.updateMap}>
          <option value={'cube'}>Cube Coords</option>
          <option value={'axial'}>Axial Coords</option>
          <option value={'land'}>Land Values</option>
          <option value={'start'}>Start Tiles</option>
        </select>
      </div>
    )

    const hexagonSize = { x: 8, y: 8 };

    return(
      <div>
        <HexGrid width={450} height={450} viewBox="-50 -50 100 100">
          <Layout size={hexagonSize} flat={true} spacing={1.0} origin={{ x: 0, y: 0 }}>
            {tiles}
          </Layout>
        </HexGrid>
        {debugMenu}
      </div>
    )
  }
}

export default SmallHexMap