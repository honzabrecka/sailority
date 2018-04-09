import React from 'react'
import Svg, { Circle, Path } from 'react-native-svg'

const CircleVector = ({
  size, scale, circle = true, sector = false,
}) => {
  const stroke = 0.8
  return (
    <Svg viewBox="0 0 200 200" width={size} height={size}>
      {circle && <Circle strokeWidth={1 / (scale * stroke)} fill="none" stroke="#DDD" strokeOpacity="0.5" cx="100" cy="100" r="90" />}
      {false && <Path strokeWidth={1 / (scale * stroke)} fill="none" stroke="#AFFF20" strokeOpacity="0.5" d="M100,10 A90,90 1 0 1 184.57233587073176,69.21818710068982" />}
      {sector && <Path strokeWidth={1 / (scale * stroke)} fill="none" stroke="#DDD" strokeOpacity="0.5" d="M100,10 A90,90 1 0 1 100,190 A90,90 1 0 1 15.427664129268251,69.2181871006898" />}
    </Svg>
  )
}

export default CircleVector
