import React from 'react'
import {IMAGES} from '../data/images'

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
      handleMouseMove: props.handleMouseMove,
      image: `sm_${props.x}_${props.y}`
    }
  }

  debugText(posX, posY) {
    const {x, y, q, r, s, start, sides} = this.state
    const {show} = this.props
    if(show === 'axial') {
      return <text x={posX} y={posY} transform={`translate(40 19)`}>{`${x}, ${y}`}</text>
    }else if(show === 'cube') {
      return <text x={posX} y={posY} transform={`translate(34 19)`}>{`${q}, ${r}, ${s}`}</text>
    }else if(show === 'start') {
      return <text x={posX} y={posY} transform={`translate(30 19)`}>{start ? `START: ${start}` : ''}</text>
    }else if(show === 'land') {
      return (
        <g>
          <text x={posX} y={posY} transform={`translate(36 2)`}>{sides[0][0]}</text>
          <text x={posX} y={posY} transform={`translate(46 2)`}>{sides[0][1]}</text>
          <text x={posX} y={posY} transform={`translate(54 5)`}>{sides[1][0]}</text>
          <text x={posX} y={posY} transform={`translate(58 13)`}>{sides[1][1]}</text>
          <text x={posX} y={posY} transform={`translate(58 21)`}>{sides[2][0]}</text>
          <text x={posX} y={posY} transform={`translate(54 29)`}>{sides[2][1]}</text>
          <text x={posX} y={posY} transform={`translate(46 34)`}>{sides[3][0]}</text>
          <text x={posX} y={posY} transform={`translate(36 34)`}>{sides[3][1]}</text>
          <text x={posX} y={posY} transform={`translate(28 29)`}>{sides[4][0]}</text>
          <text x={posX} y={posY} transform={`translate(24 21)`}>{sides[4][1]}</text>
          <text x={posX} y={posY} transform={`translate(24 13)`}>{sides[5][0]}</text>
          <text x={posX} y={posY} transform={`translate(28 5)`}>{sides[5][1]}</text>
        </g>
      )
    }
  }

  render() {
    const {positionX, positionY, corners, handleMouseMove, image} = this.state
    return (
      <g>
        <image href={IMAGES[image]} height='50' width='50' transform={`translate(${positionX+20} ${positionY-10})`}/>
        <polygon
        onMouseMove={handleMouseMove}
        points={corners}
        transform={`translate(${positionX+20} ${positionY-6})`}
        className={this.props.className}
      />
      {this.debugText(positionX,positionY)}
    </g>
    )
  }
}

export default Hex