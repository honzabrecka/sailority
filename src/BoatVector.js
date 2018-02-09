import React from 'react'
import Svg, { G, Path } from 'react-native-svg'

const BoatVector = ({ width, height, color }) => (
  <Svg width={width} height={height} viewBox="0 0 592 152" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <G id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" origin="296, 76">
      <Path d="M0,76 C0,76 2.56739074e-16,60 3,42.5518899 C6,25.1037799 22.2469029,14.2659476 44,12 C92,7 143,3.55965257e-15 231,0 C273.566519,0 343,4 432,25 C503.243108,41.8101716 572.226911,64.946702 587.563357,71.1930184 C592,73 592,76 592,76 L0,76 Z M0,76 C0,76 2.56739074e-16,92 3,109.44811 C6,126.89622 22.2469029,137.734052 44,140 C92,145 143,152 231,152 C273.566519,152 343,148 432,127 C503.243108,110.189828 572.226911,87.053298 587.563357,80.8069816 C592,79 592,76 592,76 L0,76 Z" id="Combined-Shape" fill={color} />
    </G>
  </Svg>
)

export default BoatVector
