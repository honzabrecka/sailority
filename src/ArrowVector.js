import React, { Component } from 'react'
import Svg, {
  Circle,
  Ellipse,
  G,
  LinearGradient,
  RadialGradient,
  Line,
  Path,
  Polygon,
  Polyline,
  Rect,
  Symbol,
  Use,
  Defs
} from 'react-native-svg'

export default class BoatVector extends Component {

  render() {
    const {width, height, color} = this.props
    return (
      <Svg width={width} height={height} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#000000"><Path d="M 64.00,416.00l 96.00,96.00l 256.00-256.00L 160.00,0.00L 64.00,96.00l 160.00,160.00L 64.00,416.00z" ></Path></Svg>
    )
  }

}
