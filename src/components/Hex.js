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
      return <text x={posX} y={posY} style={{fontSize: '7pt'}} transform={`translate(16 22)`} stroke="#333333">{`${x}, ${y}`}</text>
    }else if(show === 'cube') {
      return <text x={posX} y={posY} style={{fontSize: '7pt'}} transform={`translate(12 22)`} stroke="#333333">{`${q}, ${r}, ${s}`}</text>
    }else if(show === 'start') {
      return <text x={posX} y={posY} style={{fontSize: '7pt'}} transform={`translate(8 22)`} stroke="#333333">{start ? `START: ${start}` : ''}</text>
    }else if(show === 'land') {
      return (
        <g>
          <text x={posX} y={posY} style={{fontSize: '7pt'}} transform={`translate(14 9)`} stroke="#333333">{sides[0][0]}</text>
          <text x={posX} y={posY} style={{fontSize: '7pt'}} transform={`translate(25 9)`} stroke="#333333">{sides[0][1]}</text>
          <text x={posX} y={posY} style={{fontSize: '7pt'}} transform={`translate(33 12)`} stroke="#333333">{sides[1][0]}</text>
          <text x={posX} y={posY} style={{fontSize: '7pt'}} transform={`translate(37 20)`} stroke="#333333">{sides[1][1]}</text>
          <text x={posX} y={posY} style={{fontSize: '7pt'}} transform={`translate(37 28)`} stroke="#333333">{sides[2][0]}</text>
          <text x={posX} y={posY} style={{fontSize: '7pt'}} transform={`translate(33 36)`} stroke="#333333">{sides[2][1]}</text>
          <text x={posX} y={posY} style={{fontSize: '7pt'}} transform={`translate(25 40)`} stroke="#333333">{sides[3][0]}</text>
          <text x={posX} y={posY} style={{fontSize: '7pt'}} transform={`translate(14 40)`} stroke="#333333">{sides[3][1]}</text>
          <text x={posX} y={posY} style={{fontSize: '7pt'}} transform={`translate(8 36)`} stroke="#333333">{sides[4][0]}</text>
          <text x={posX} y={posY} style={{fontSize: '7pt'}} transform={`translate(4 28)`} stroke="#333333">{sides[4][1]}</text>
          <text x={posX} y={posY} style={{fontSize: '7pt'}} transform={`translate(4 20)`} stroke="#333333">{sides[5][0]}</text>
          <text x={posX} y={posY} style={{fontSize: '7pt'}} transform={`translate(8 12)`} stroke="#333333">{sides[5][1]}</text>
        </g>
      )
    }
  }

  render() {
    const {positionX, positionY, corners, handleMouseMove, image} = this.state
    return (
      <g>
        <image href={IMAGES[image]} height='50' width='50' transform={`translate(${positionX} ${positionY-4})`}/>
        <polygon
        onMouseMove={handleMouseMove}
        points={corners}
        fill={IMAGES[image] ? 'none' : '#f6f0e6'}
        transform={`translate(${positionX} ${positionY})`}
        stroke="darkgray" strokeWidth='1'
        className={this.props.className}
      />
      {this.debugText(positionX,positionY)}
    </g>
    )
  }
}

export default Hex