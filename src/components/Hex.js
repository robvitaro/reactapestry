import React from 'react'
import {Hexagon, Text} from "react-hexgrid";

class Hex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      q: props.q,
      r: props.r,
      s: props.s,
      x: props.x,
      y: props.y,
      start: props.start,
    }
  }

  debugText() {
    if(this.props.show === 'axial') {
      return <Text>{`${this.state.x}, ${this.state.y}`}</Text>
    }else if(this.props.show === 'cube') {
      return <Text>{`${this.state.q}, ${this.state.r}, ${this.state.s}`}</Text>
    }else if(this.props.show === 'start') {
      return <Text>{this.state.start ? 'START' : ''}</Text>
    }else if(this.props.show === 'land') {
      return (
        <g>
          {/* 0 */}
          <Text x={-2} y={-5}>W</Text>
          <Text x={2} y={-5}>M</Text>
          {/* 1 */}
          <Text x={4} y={-4}>O</Text>
          <Text x={6} y={-1}>F</Text>
          {/* 2 */}
          <Text x={6} y={2}>D</Text>
          <Text x={4} y={5}>G</Text>
          {/* 3 */}
          <Text x={-2} y={6}>O</Text>
          <Text x={2} y={6}>F</Text>
          {/* 4 */}
          <Text x={-6} y={2}>D</Text>
          <Text x={-4} y={5}>G</Text>
          {/* 5 */}
          <Text x={-4} y={-4}>W</Text>
          <Text x={-6} y={-1}>M</Text>
        </g>
      )
    }
  }

  render() {
    return (
      <Hexagon q={this.state.q} r={this.state.r} s={this.state.s}>
        {this.debugText() }
      </Hexagon>
    )
  }
}

export default Hex