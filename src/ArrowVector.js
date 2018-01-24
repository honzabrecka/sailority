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

export default class ArrowVector extends Component {

  render() {
    const {width, height, fills} = this.props
    const [a, b, c] = fills
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 46 110.65">
        <Path d="M37.38,110.65L46,102,23,79,0,102l8.63,8.63L23,96.28Z" fill={a}/>
        <Path d="M37.38,71.14L46,62.51l-23-23-23,23,8.63,8.63L23,56.76Z" fill={b}/>
        <Path d="M37.38,31.63L46,23,23,0,0,23l8.63,8.63L23,17.25Z" fill={c}/>
      </Svg>
    )
  }

}
