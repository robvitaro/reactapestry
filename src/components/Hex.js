import React from 'react'
import {IMAGES} from '../data/images'
import {HEX_GLOBAL_OFFSET_X, HEX_GLOBAL_OFFSET_Y} from "./SmallHexMap";

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
      positionX: props.positionX,
      positionY: props.positionY,
      corners: props.corners,
      handleMouseMove: props.handleMouseMove,
    }
  }

  debugText(posX, posY) {
    const {x, y, q, r, s, start} = this.state
    const {show, sides} = this.props
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
    const {positionX, positionY, corners} = this.state
    const {image, className, rotation} = this.props
    const imageTag = image !== ''
      ? <image
          href={IMAGES[image]}
          height='50' width='50'
          transform={`translate(${positionX - HEX_GLOBAL_OFFSET_X} ${positionY- HEX_GLOBAL_OFFSET_Y - 5}) rotate(${60 * rotation}, 25, 25)`}
        />
      : null

    return (
      <g >
        {imageTag}
        <polygon
          points={corners}
          transform={`translate(${positionX - HEX_GLOBAL_OFFSET_X} ${positionY - HEX_GLOBAL_OFFSET_Y})`}
          className={className}
        />
        {this.debugText(positionX,positionY)}
      </g>
    )
  }
}

export default Hex