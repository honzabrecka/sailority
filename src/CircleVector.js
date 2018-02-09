import React from 'react'
import Svg, { Circle, Path } from 'react-native-svg'

const CircleVector = ({
  size, scale, circle = true, sector = false,
}) => {
  const stroke = 4
  return (
    <Svg class="Sektor" viewBox="0 0 200 200" width={size} height={size}>
      {circle && <Circle class="Sektor-circle" strokeWidth={1 / (scale * stroke)} fill="none" stroke="#DDD" strokeOpacity="0.5" cx="100" cy="100" r="90" />}
      {false && sector && <Path class="Sektor-sector" strokeWidth={1 / (scale * stroke)} fill="none" stroke="#AFFF20" strokeOpacity="0.5" d="M100,10 A90,90 1 0 1 184.57233587073176,69.21818710068982" />}
    </Svg>
  )
}

export default CircleVector
