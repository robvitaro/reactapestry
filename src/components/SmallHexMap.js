import React from 'react'
import {Hexagon, HexGrid, Layout, Text} from "react-hexgrid";

class SmallHexMap extends React.Component {
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
            <Hexagon q={q} r={r} s={s}>
              <Text className='hidden'>{`${x}, ${y}`}</Text>
              <Text>{`${q}, ${r}, ${s}`}</Text>
            </Hexagon>
          )
        }
      }
    }


    const hexagonSize = { x: 8, y: 8 };
    return(
      <div>
        <HexGrid width={500} height={300} viewBox="-50 -50 100 100">
          <Layout size={hexagonSize} flat={true} spacing={1.0} origin={{ x: 0, y: 0 }}>
            {tiles}
          </Layout>
        </HexGrid>
      </div>
    )
  }
}

export default SmallHexMap