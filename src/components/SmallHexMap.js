import React from 'react'
import {Hexagon, HexGrid, Layout, Text} from "react-hexgrid";

class SmallHexMap extends React.Component {
  render() {
    const hexagonSize = { x: 8, y: 8 };
    return(
      <div>
        <HexGrid width={500} height={300} viewBox="-50 -50 100 100">
          <Layout size={hexagonSize} flat={true} spacing={1.0} origin={{ x: 0, y: 0 }}>
            <Hexagon q={0} r={0} s={0}>
              <Text className='hidden'>q, r</Text>
              <Text>0, 0, 0</Text>
            </Hexagon>
            <Hexagon q={0} r={-1} s={1}>
              <Text className='hidden'>q, r</Text>
              <Text>0, -1, 1</Text>
            </Hexagon>
            <Hexagon q={0} r={1} s={-1}>
              <Text className='hidden'>q, r</Text>
              <Text>0, 1, -1</Text>
            </Hexagon>
            <Hexagon q={1} r={-1} s={0}>
              <Text className='hidden'>q, r</Text>
              <Text>1, -1, 0</Text>
            </Hexagon>
            <Hexagon q={1} r={0} s={-1}>
              <Text className='hidden'>q, r</Text>
              <Text>1, 0, -1</Text>
            </Hexagon>
            <Hexagon q={-1} r={1} s={0}>
              <Text className='hidden'>q, r</Text>
              <Text>-1, 1, 0</Text>
            </Hexagon>
            <Hexagon q={-1} r={0} s={1}>
              <Text className='hidden'>q, r</Text>
              <Text>-1, 0, 1</Text>
            </Hexagon>
            <Hexagon q={-2} r={0} s={2}>
              <Text className='hidden'>q, r</Text>
              <Text>-2, 0, 2</Text>
            </Hexagon>
            <Hexagon q={-2} r={1} s={1}>
              <Text className='hidden'>q, r</Text>
              <Text>-2, 1, 1</Text>
            </Hexagon>
            <Hexagon q={-2} r={2} s={0}>
              <Text className='hidden'>q, r</Text>
              <Text>-2, 2, 0</Text>
            </Hexagon>
            <Hexagon q={2} r={-2} s={0}>
              <Text className='hidden'>q, r</Text>
              <Text>2, -2, 0</Text>
            </Hexagon>
            <Hexagon q={2} r={-1} s={1}>
              <Text className='hidden'>q, r</Text>
              <Text>2, -1, 1</Text>
            </Hexagon>
            <Hexagon q={2} r={0} s={-2}>
              <Text className='hidden'>q, r</Text>
              <Text>2, 0, -2</Text>
            </Hexagon>
            <Hexagon q={-1} r={-1} s={2}>
              <Text className='hidden'>q, r</Text>
              <Text>-1, -1, 2</Text>
            </Hexagon>
            <Hexagon q={0} r={-2} s={2}>
              <Text className='hidden'>q, r</Text>
              <Text>0, -2, 2</Text>
            </Hexagon>
            <Hexagon q={1} r={-2} s={1}>
              <Text className='hidden'>q, r</Text>
              <Text>1, -2, 1</Text>
            </Hexagon>
            <Hexagon q={-1} r={2} s={-1}>
              <Text className='hidden'>q, r</Text>
              <Text>-1, 2, -1</Text>
            </Hexagon>
            <Hexagon q={0} r={2} s={-2}>
              <Text className='hidden'>q, r</Text>
              <Text>0, 2, -2</Text>
            </Hexagon>
            <Hexagon q={1} r={1} s={-2}>
              <Text className='hidden'>q, r</Text>
              <Text>1, 1, -2</Text>
            </Hexagon>
            <Hexagon q={-3} r={1} s={2}>
              <Text className='hidden'>q, r</Text>
              <Text>-3, 1, 2</Text>
            </Hexagon>
            <Hexagon q={-3} r={2} s={1}>
              <Text className='hidden'>q, r</Text>
              <Text>-3, 2, 1</Text>
            </Hexagon>
            <Hexagon q={-3} r={3} s={0}>
              <Text className='hidden'>q, r</Text>
              <Text>-3, 3, 0</Text>
            </Hexagon>
            <Hexagon q={3} r={-2} s={-1}>
              <Text className='hidden'>q, r</Text>
              <Text>3, -2, -1</Text>
            </Hexagon>
            <Hexagon q={3} r={-1} s={-2}>
              <Text className='hidden'>q, r</Text>
              <Text>3, -1, -2</Text>
            </Hexagon>
            <Hexagon q={3} r={0} s={-3}>
              <Text className='hidden'>q, r</Text>
              <Text>3, 0, -3</Text>
            </Hexagon>
            <Hexagon q={0} r={-3} s={3}>
              <Text className='hidden'>q, r</Text>
              <Text>0, -3, 3</Text>
            </Hexagon>
            <Hexagon q={-2} r={-1} s={3}>
              <Text className='hidden'>q, r</Text>
              <Text>-2, -1, 3</Text>
            </Hexagon>
            <Hexagon q={-1} r={-2} s={3}>
              <Text className='hidden'>q, r</Text>
              <Text>-1, -2, 3</Text>
            </Hexagon>
            <Hexagon q={1} r={-3} s={2}>
              <Text className='hidden'>q, r</Text>
              <Text>1, -3, 2</Text>
            </Hexagon>
            <Hexagon q={2} r={-3} s={1}>
              <Text className='hidden'>q, r</Text>
              <Text>2, -3, 1</Text>
            </Hexagon>
            <Hexagon q={-2} r={3} s={-1}>
              <Text className='hidden'>q, r</Text>
              <Text>-2, 3, -1</Text>
            </Hexagon>
            <Hexagon q={-1} r={3} s={-2}>
              <Text className='hidden'>q, r</Text>
              <Text>-1, 3, -2</Text>
            </Hexagon>
            <Hexagon q={1} r={2} s={-3}>
              <Text className='hidden'>q, r</Text>
              <Text>1, 2, -3</Text>
            </Hexagon>
            <Hexagon q={2} r={1} s={-3}>
              <Text className='hidden'>q, r</Text>
              <Text>2, 1, -3</Text>
            </Hexagon>
          </Layout>
        </HexGrid>
      </div>
    )
  }
}

export default SmallHexMap