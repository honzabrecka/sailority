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

export default class CircleVector extends Component {

  render() {
    const {size, scale, circle = true, sector = false} = this.props
    const stroke = 4
    return (
      <Svg class="Sektor" viewBox="0 0 200 200" width={size} height={size}>
        {circle && <Circle class="Sektor-circle" strokeWidth={1 / scale * stroke} fill="none" stroke="#DDD" strokeOpacity="0.5" cx="100" cy="100" r="90"></Circle>}
        {sector && <Path class="Sektor-sector" strokeWidth={1 / scale * stroke} fill="none" stroke="#DE5554" strokeOpacity="0.5" d="M100,10 A90,90 1 0 1 184.57233587073176,69.21818710068982"></Path>}
      </Svg>
    )
  }

}
