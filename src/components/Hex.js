import React from 'react'
// import {Hexagon, Text} from "react-hexgrid";

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
      sides: props.sides
    }
  }

  debugText() {
    // if(this.props.show === 'axial') {
    //   return <Text>{`${this.state.x}, ${this.state.y}`}</Text>
    // }else if(this.props.show === 'cube') {
    //   return <Text>{`${this.state.q}, ${this.state.r}, ${this.state.s}`}</Text>
    // }else if(this.props.show === 'start') {
    //   return <Text>{this.state.start ? `START: ${this.state.start}` : ''}</Text>
    // }else if(this.props.show === 'land') {
    //   return (
    //     <g>
    //       <Text x={-2} y={-5}>{this.state.sides[0][0]}</Text>
    //       <Text x={2} y={-5}>{this.state.sides[0][1]}</Text>
    //       <Text x={4} y={-4}>{this.state.sides[1][0]}</Text>
    //       <Text x={6} y={-1}>{this.state.sides[1][1]}</Text>
    //       <Text x={6} y={2}>{this.state.sides[2][0]}</Text>
    //       <Text x={4} y={5}>{this.state.sides[2][1]}</Text>
    //       <Text x={2} y={6}>{this.state.sides[3][0]}</Text>
    //       <Text x={-2} y={6}>{this.state.sides[3][1]}</Text>
    //       <Text x={-4} y={5}>{this.state.sides[4][0]}</Text>
    //       <Text x={-6} y={2}>{this.state.sides[4][1]}</Text>
    //       <Text x={-6} y={-1}>{this.state.sides[5][0]}</Text>
    //       <Text x={-4} y={-4}>{this.state.sides[5][1]}</Text>
    //     </g>
    //   )
    // }
  }

  render() {
    return (''
      // <Hexagon q={this.state.q} r={this.state.r} s={this.state.s}>
      //   {this.debugText() }
      // </Hexagon>
    )
  }
}

export default Hex