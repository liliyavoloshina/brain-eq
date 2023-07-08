import Sketch from 'react-p5'
import p5Types from 'p5'
import { useContext, useEffect, useState } from 'react'
import { StateContext } from '../utils/context'

interface Props {
  leftFreq: number
  rightFreq: number
  isPlaying: boolean
}

export default function SineWave(props: Props): JSX.Element {
  const { state } = useContext(StateContext)
  const [primaryColor, setPrimaryColor] = useState('')
  const [isMounted, setIsMounted] = useState(false)

  const getPageSizes = (): { pageWidth: number; pageHeight: number } => {
    const pageContainer = document.querySelector('#audio-visualizer-container')
    if (!pageContainer) return { pageWidth: 0, pageHeight: 0 }
    const styles = getComputedStyle(pageContainer)
    return {
      pageWidth: parseInt(styles.width, 10),
      pageHeight: parseInt(styles.height, 10)
    }
  }

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    const { pageWidth, pageHeight } = getPageSizes()
    p5.createCanvas(pageWidth, pageHeight).parent(canvasParentRef)
    p5.angleMode(p5.DEGREES)
  }

  const getPrimaryColor = () => {
    const colorsContainer = document.querySelector('#colors-container')
    if (!colorsContainer) return ''
    const styles = getComputedStyle(colorsContainer)
    return styles.getPropertyValue('--primary')
  }

  const setLinearGradient = (sX, sY, eX, eY, colorS, colorE, p5) => {
    const gradient = p5.drawingContext.createLinearGradient(sX, sY, eX, eY)
    gradient.addColorStop(0, colorS)
    gradient.addColorStop(1, colorE)
    p5.drawingContext.fillStyle = gradient
  }

  const draw = (p5: p5Types) => {
    // Take color from current brainwave state

    const ac1 = p5.color(23, 32, 48, 0.8)
    const ac2 = p5.color(primaryColor + '80')

    const scalingFactor = (1 / 495) * 4
    const adjustedFreqLeft = (props.leftFreq - 5) * scalingFactor
    const adjustedFreqRight = (props.rightFreq - 5) * scalingFactor
    const adjustedFreqDelta = (props.leftFreq - props.rightFreq - 5) * scalingFactor

    const animSpeedLeft = props.isPlaying ? adjustedFreqLeft * 2 : 0
    const animSpeedRight = props.isPlaying ? adjustedFreqRight * 2 : 0
    const animSpeedDelta = props.isPlaying ? adjustedFreqDelta * 25 : 0

    p5.background('rgba(23, 32, 48, 0.8)')
    p5.stroke(primaryColor + '80')
    p5.strokeWeight(2)

    setLinearGradient(
      p5.width,
      p5.height / 2 - 100, // Start point
      p5.width,
      p5.height / 2 + 1000, // End point
      p5.color(primaryColor + '19'), // Start color + 10% opacity (https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4)
      p5.color(primaryColor + '99'), //End color + 60% opacity
      p5
    )

    for (let y = 0; y < p5.height; y++) {
      const n = p5.map(y, 0, p5.height, -0.2, 1)
      const newc = p5.lerpColor(ac1, ac2, n)
      p5.stroke(newc)
      p5.line(0, y, p5.width, y)
    }

    p5.translate(0, p5.height / 2)

    // Line 1 -> Left Frequency

    p5.beginShape()

    for (let i = 0; i < 360; i++) {
      const angle = p5.frameCount * animSpeedLeft // Updates the angle based on frame count (animates the wave)

      const x = p5.map(i, 0, 359, 0, p5.width)
      const y = p5.sin((i + angle) * adjustedFreqLeft) * 25 // Controls the height and "frequency" of the curve

      p5.vertex(x, y)
    }

    p5.vertex(p5.width, p5.height / 2)
    p5.vertex(0, p5.height / 2)

    p5.endShape(p5.CLOSE)

    // Line 2 -> Right Frequency

    p5.beginShape()

    for (let i = 0; i < 360; i++) {
      const angle = p5.frameCount * animSpeedRight // Updates the angle based on frame count (animates the wave)

      const x = p5.map(i, 0, 359, 0, p5.width)
      const y = p5.sin((i + angle) * adjustedFreqRight) * 25 // Controls the height and "frequency" of the curve

      p5.vertex(x, y)
    }

    p5.vertex(p5.width, p5.height / 2)
    p5.vertex(0, p5.height / 2)

    p5.endShape(p5.CLOSE)

    // Line 3 -> Delta Frequency

    // Show 2 lines for left and right. In addition to that, show a third line (colored) showing the actual
    // frequency being created by the brain

    p5.translate(0, p5.height / 10)

    p5.beginShape()

    for (let i = 0; i < 360; i++) {
      const angle = p5.frameCount * animSpeedDelta // Updates the angle based on frame count (animates the wave)

      const x = p5.map(i, 0, 359, 0, p5.width)
      const y = p5.sin((i + angle) * adjustedFreqDelta) * 35 // Controls the height and "frequency" of the curve

      p5.vertex(x, y)
    }

    p5.vertex(p5.width, p5.height / 2)
    p5.vertex(0, p5.height / 2)

    p5.endShape(p5.CLOSE)
  }

  useEffect(() => {
    setIsMounted(true)
    setPrimaryColor(getPrimaryColor)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    setPrimaryColor(getPrimaryColor)
  }, [state])

  return (
    <div key={state}>
      <Sketch setup={setup} draw={draw} />
    </div>
  )
}
