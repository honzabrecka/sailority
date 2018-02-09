import React, { Component } from 'react'
import {
  Dimensions,
  PanResponder,
  StyleSheet,
  View,
} from 'react-native'
import ArrowVector from './src/ArrowVector'
import BoatVector from './src/BoatVector'
import CircleVector from './src/CircleVector'
import SeaVector from './src/SeaVector'
import WindVector from './src/WindVector'

const TWO_PI = Math.PI * 2

function normalizeRotation(r) {
  return r - (TWO_PI * Math.floor((r + Math.PI) / TWO_PI))
}

const Sea = ({
  center, screenWidth, screenHeight, rotation = 0,
}) => {
  const originalSize = 342
  const [centerX, centerY] = center
  const screenDiagonal = Math.sqrt((screenWidth * screenWidth) + (screenHeight * screenHeight))
  const scale = screenDiagonal / originalSize
  const scaledSize = originalSize * scale
  const style = {
    position: 'absolute',
    left: centerX - (scaledSize * 0.5),
    top: centerY - (scaledSize * 0.5),
    transform: [{ rotate: `${rotation}rad` }],
    width: scaledSize,
    height: scaledSize,
    backgroundColor: 'rgba(14, 175, 224, 0.83)',
  }
  return (
    <View style={style}>
      <SeaVector size={scaledSize} />
    </View>
  )
}

const Circle = ({
  scale, center, size, rotation = 0, circle, sector,
}) => {
  const originalSize = 200
  const [centerX, centerY] = center
  const scaledSize = originalSize * scale * size
  const style = {
    position: 'absolute',
    left: centerX - (scaledSize * 0.5),
    top: centerY - (scaledSize * 0.5),
    transform: [{ rotate: `${rotation + ((Math.PI * 4) / 5)}rad` }],
  }
  return (
    <View style={style}>
      <CircleVector size={scaledSize} scale={size} circle={circle} sector={sector} />
    </View>
  )
}

const Arrows = ({ scale, center, rotation }) => {
  const [centerX, centerY] = center
  const size = 0.8
  const originalWidth = 46 * size
  const originalHeight = 110.65 * size
  const style = {
    position: 'absolute',
    left: centerX - (originalWidth * scale * 0.5),
    top: centerY - (originalHeight * scale * 0.5),
    transform: [{ rotate: `${rotation}rad` }],
  }
  return (
    <View style={style}>
      <ArrowVector
        width={(originalWidth * scale)}
        height={(originalHeight * scale)}
        fills={[
          'rgba(255, 255, 255, 0.8)',
          'rgba(255, 255, 255, 0.6)',
          'rgba(255, 255, 255, 0.3)',
        ]}
      />
    </View>
  )
}

const rotable = Wrapped => class Rotable extends Component {
    d = Math.PI * 1.5

    state = {
      tapStart: Date.now(),
      firstTap: Date.now(),
    }

    constructor(props) {
      super(props)
      this.handleStartShouldSetPanResponder = this.handleStartShouldSetPanResponder.bind(this)
      this.handlePanResponderMove = this.handlePanResponderMove.bind(this)
      this.handlePanResponderEnd = this.handlePanResponderEnd.bind(this)
    }

    componentWillMount() {
      this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
        onMoveShouldSetPanResponder: this.handleMoveShouldSetPanResponder,
        onPanResponderGrant: this.handlePanResponderGrant,
        onPanResponderMove: this.handlePanResponderMove,
        onPanResponderRelease: this.handlePanResponderEnd,
        onPanResponderTerminate: this.handlePanResponderEnd,
      })
    }

    handleStartShouldSetPanResponder() {
      this.setState({ tapStart: Date.now() })
      return true
    }

    handleMoveShouldSetPanResponder() {
      return true
    }

    handlePanResponderGrant() {

    }

    handlePanResponderMove(event, gestureState) {
      const { screenWidth, screenHeight, onChange } = this.props
      const rotation = normalizeRotation(this.d + Math.atan2(
        gestureState.moveY - (screenHeight * 0.5),
        gestureState.moveX - (screenWidth * 0.5),
      ))
      onChange && onChange(rotation)
    }

    handlePanResponderEnd(event, gestureState) {
      const { onTap, onDoubleTap } = this.props
      const { tapStart, firstTap } = this.state
      const {
        dx, dy, moveX, moveY, vx, vy,
      } = gestureState
      const now = Date.now()

      if (dx === 0 && dy === 0
        && moveX === 0 && moveY === 0
        && vx === 0 && vy === 0
        && now - tapStart <= 100) {
        this.setState({ firstTap: Date.now() })
        onTap && onTap()

        if (now - firstTap <= 200) { onDoubleTap && onDoubleTap() }
      }
    }

    render() {
      const {
        distanceFromCenter, center, rotation = 0, scale,
      } = this.props
      const r = rotation + Math.PI
      const [centerX, centerY] = center
      const x = centerX
      const y = centerY - (distanceFromCenter * scale)
      const newX = (centerX + ((x - centerX) * Math.cos(x))) - ((y - centerY) * Math.sin(r))
      const newY = centerY + ((x - centerX) * Math.sin(x)) + ((y - centerY) * Math.cos(r))
      const style = {
        position: 'absolute',
        top: newY,
        left: newX,
        transform: [{ rotate: `${rotation}rad` }],
      }
      const handlerSize = 64
      const handlerStyle = {
        position: 'absolute',
        top: handlerSize * -0.5 * scale,
        left: handlerSize * -0.5 * scale,
        width: handlerSize * scale,
        height: handlerSize * scale,
      }

      return (
        <View style={style}>
          <Wrapped {...this.props} />
          <View style={handlerStyle} {...this.panResponder.panHandlers} />
        </View>
      )
    }
}

const Wind = ({ scale, size, handlers }) => {
  const originalSize = 512
  const scaledSize = originalSize * scale * size
  const style = {
    position: 'absolute',
    left: scaledSize * -0.5,
    top: scaledSize * -0.5,
    width: scaledSize,
    height: scaledSize,
    transform: [{ rotate: '-90deg' }],
  }

  return (
    <View style={style} {...handlers}>
      <WindVector width={scaledSize} height={scaledSize} />
    </View>
  )
}

const Boat = ({
  scale, size, type, handlers, sailRotation,
}) => {
  const originalWidth = 592
  const originalHeight = 152
  const scaledWidth = originalWidth * scale * size
  const scaledHeight = originalHeight * scale * size
  const boatStyle = {
    position: 'absolute',
    left: scaledWidth * -0.5,
    top: scaledHeight * -0.5,
    width: scaledWidth,
    height: scaledHeight,
    transform: [{ rotate: '-90deg' }],
  }
  const sailWidth = 20 * scale * size
  const sailHeight = 300 * scale * size * 2
  const sailHolderStyle = {
    position: 'absolute',
    top: (scaledHeight - sailWidth) * 0.5,
    left: 0,
    width: sailHeight,
    height: sailWidth,
    transform: [{ rotate: `${sailRotation}rad` }],
  }
  const sailStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: sailHeight * 0.5,
    height: sailWidth,
    backgroundColor: '#cc0000',
  }

  return (
    <View style={boatStyle} {...handlers}>
      <BoatVector width={scaledWidth} height={scaledHeight} color="#ffffff" />
      {type &&
        <View style={sailHolderStyle}>
          <View style={sailStyle} />
        </View>}
    </View>
  )
}

const RotableWind = rotable(Wind)

const RotableBoat = rotable(Boat)

const ScalableSquare = ({ screenWidth, screenHeight, children }) => {
  const originalSize = 375
  const width = Math.min(screenWidth, screenHeight)
  const scale = width / originalSize
  const center = [originalSize * scale * 0.5, originalSize * scale * 0.5]
  const style = {
    width,
    height: width,
  }
  return (
    <View style={style}>
      {React.Children.map(children, child =>
        React.cloneElement(child, {
 scale, center, screenWidth, screenHeight,
}))}
    </View>
  )
}

const SAIL = true
const MOTOR = false

function computeWindDistance({
  windDistance, windRotation, boatDistance, boatRotation,
}) {
  return (Math.sqrt((windDistance * windDistance) + (boatDistance * boatDistance))
    - (2 * windDistance * boatDistance * (Math.cos(windRotation - boatRotation))))
}

function computeSailRotation(windRotation, boatRotation) {
  return normalizeRotation((windRotation + Math.PI) - boatRotation) * 0.5
}

function priority({
  boat1Type,
  boat2Type,
  // boat1Rotation,
  // boat2Rotation,
  // boat1SailRotation,
  // boat2SailRotation,
  // boat1WindDistance,
  // boat2WindDistance,
}) {
  if (boat1Type === MOTOR && boat2Type === SAIL) return 2
  if (boat2Type === MOTOR && boat1Type === SAIL) return 1
  return 1
}

const initialState = {
  windRotation: 0,
  windDistance: 160,
  boat1Rotation: Math.PI * 0.5,
  boat1SailRotation: 0,
  boat1Type: SAIL,
  boat1Distance: 97,
  boat1WindDistance: 0,
  boat2Rotation: 0,
  boat2SailRotation: 0,
  boat2Type: MOTOR,
  boat2Distance: 97,
  boat2WindDistance: 0,
}

export default class App extends Component {
  state = ((state) => {
    const { windRotation, boat1Rotation, boat2Rotation } = state
    return {
      ...state,
      boat1SailRotation: computeSailRotation(windRotation, boat1Rotation),
      boat2SailRotation: computeSailRotation(windRotation, boat2Rotation),
    }
  })(initialState)

  render() {
    const {
      windRotation,
      windDistance,
      boat1Rotation,
      boat1SailRotation,
      boat1Type,
      boat1Distance,
      // boat1WindDistance,
      boat2Rotation,
      boat2SailRotation,
      boat2Type,
      boat2Distance,
      // boat2WindDistance,
    } = this.state
    const { width, height } = Dimensions.get('window')

    return (
      <View style={styles.container}>
        <ScalableSquare screenWidth={width} screenHeight={height}>
          <Sea />
          <Circle
            size={1.8}
          />
          <Circle
            size={1.1}
          />
          <Circle
            size={1.1}
            circle={false}
            sector
            rotation={boat1Rotation}
          />
          <Circle
            size={1.1}
            circle={false}
            sector
            rotation={boat2Rotation}
          />
          <Arrows rotation={priority(this.state) === 1 ? boat1Rotation : boat2Rotation} />
          <RotableWind
            size={0.08}
            distanceFromCenter={windDistance}
            rotation={windRotation}
            onChange={(windRotation) => {
              const {
 windDistance, boat1Distance, boat1Rotation, boat2Distance, boat2Rotation,
} = this.state
              this.setState({
                windRotation,
                boat1WindDistance: computeWindDistance({
                  windDistance,
                  windRotation,
                  boatDistance: boat1Distance,
                  boatRotation: boat1Rotation,
                }),
                boat2WindDistance: computeWindDistance({
                  windDistance,
                  windRotation,
                  boatDistance: boat2Distance,
                  boatRotation: boat2Rotation,
                }),
                boat1SailRotation: computeSailRotation(windRotation, boat1Rotation),
                boat2SailRotation: computeSailRotation(windRotation, boat2Rotation),
              })
            }}
          />
          <RotableBoat
            size={0.12}
            distanceFromCenter={boat1Distance}
            type={boat1Type}
            rotation={boat1Rotation}
            sailRotation={boat1SailRotation}
            onChange={(boat1Rotation) => {
              const { windDistance, windRotation, boat1Distance } = this.state
              this.setState({
                boat1Rotation,
                boat1WindDistance: computeWindDistance({
                  windDistance,
                  windRotation,
                  boatDistance: boat1Distance,
                  boatRotation: boat1Rotation,
                }),
                boat1SailRotation: computeSailRotation(windRotation, boat1Rotation),
                boat2SailRotation: computeSailRotation(windRotation, boat2Rotation),
              })
            }}
            onDoubleTap={() => this.setState({ boat1Type: !boat1Type })}
          />
          <RotableBoat
            size={0.12}
            distanceFromCenter={boat2Distance}
            type={boat2Type}
            rotation={boat2Rotation}
            sailRotation={boat2SailRotation}
            onChange={(boat2Rotation) => {
              const { windDistance, windRotation, boat2Distance } = this.state
              this.setState({
                boat2Rotation,
                boat2WindDistance: computeWindDistance({
                  windDistance,
                  windRotation,
                  boatDistance: boat2Distance,
                  boatRotation: boat2Rotation,
                }),
                boat1SailRotation: computeSailRotation(windRotation, boat1Rotation),
                boat2SailRotation: computeSailRotation(windRotation, boat2Rotation),
              })
            }}
            onDoubleTap={() => this.setState({ boat2Type: !boat2Type })}
          />
        </ScalableSquare>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
