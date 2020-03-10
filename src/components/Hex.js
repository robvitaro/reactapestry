import React from 'react'

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
      sides: props.sides,
      positionX: props.positionX,
      positionY: props.positionY,
      corners: props.corners,
      handleMouseMove: props.handleMouseMove
    }
  }

  debugText(x, y) {
    if(this.props.show === 'axial') {
      return <text x={x} y={y} style={{fontSize: '8pt'}} transform={`translate(12 20)`} stroke="darkgray">{`${this.state.x}, ${this.state.y}`}</text>
    }else if(this.props.show === 'cube') {
      return <text x={x} y={y} style={{fontSize: '8pt'}} transform={`translate(12 20)`} stroke="darkgray">{`${this.state.q}, ${this.state.r}, ${this.state.s}`}</text>
    }else if(this.props.show === 'start') {
      return <text x={x} y={y} style={{fontSize: '8pt'}} transform={`translate(12 20)`} stroke="darkgray">{this.state.start ? `START: ${this.state.start}` : ''}</text>
    }else if(this.props.show === 'land') {
      return (
        <g>
          <text x={x} y={y} style={{fontSize: '7pt'}} transform={`translate(14 9)`} stroke="#333333">{this.state.sides[0][0]}</text>
          <text x={x} y={y} style={{fontSize: '7pt'}} transform={`translate(25 9)`} stroke="#333333">{this.state.sides[0][1]}</text>
          <text x={x} y={y} style={{fontSize: '7pt'}} transform={`translate(33 12)`} stroke="#333333">{this.state.sides[1][0]}</text>
          <text x={x} y={y} style={{fontSize: '7pt'}} transform={`translate(37 20)`} stroke="#333333">{this.state.sides[1][1]}</text>
          <text x={x} y={y} style={{fontSize: '7pt'}} transform={`translate(37 28)`} stroke="#333333">{this.state.sides[2][0]}</text>
          <text x={x} y={y} style={{fontSize: '7pt'}} transform={`translate(33 36)`} stroke="#333333">{this.state.sides[2][1]}</text>
          <text x={x} y={y} style={{fontSize: '7pt'}} transform={`translate(25 40)`} stroke="#333333">{this.state.sides[3][0]}</text>
          <text x={x} y={y} style={{fontSize: '7pt'}} transform={`translate(14 40)`} stroke="#333333">{this.state.sides[3][1]}</text>
          <text x={x} y={y} style={{fontSize: '7pt'}} transform={`translate(8 36)`} stroke="#333333">{this.state.sides[4][0]}</text>
          <text x={x} y={y} style={{fontSize: '7pt'}} transform={`translate(4 28)`} stroke="#333333">{this.state.sides[4][1]}</text>
          <text x={x} y={y} style={{fontSize: '7pt'}} transform={`translate(4 20)`} stroke="#333333">{this.state.sides[5][0]}</text>
          <text x={x} y={y} style={{fontSize: '7pt'}} transform={`translate(8 12)`} stroke="#333333">{this.state.sides[5][1]}</text>
        </g>
      )
    }
  }

  render() {
    const {x, y, positionX, positionY, corners, handleMouseMove} = this.state
    return (
      <g>
      <polygon
        onMouseMove={handleMouseMove}
        points={corners}
        transform={`translate(${positionX} ${positionY})`}
        fill="#ffffff" stroke="darkgray" strokeWidth='1'
        className={this.props.className}
      />
      {this.debugText(positionX,positionY)}
    </g>
    )
  }
}

export default Hex