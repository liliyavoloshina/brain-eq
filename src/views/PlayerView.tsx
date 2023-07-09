import RangeSlider from '@/components/RangeSlider'
import { useContext, useEffect, useMemo, useState } from 'react'
import Pizzicato  from 'pizzicato'
import AudioVisualizer from '../components/AudioVisualizer'
import { FrequencyContext, StateContext } from '../utils/context'
import { STATE_RANGE, STATES } from '../utils/constants'

export default function PlayerView() {
  const { setState } = useContext(StateContext)
  const {
    beatFrequency,
    setBeatFrequency,
    baselineFrequency,
    setBaselineFrequency,
    isFrequencyChanged,
    setIsFrequencyChanged
  } = useContext(FrequencyContext)

  const [isVolumeChanged, setIsVolumeChanged] = useState(false)
  const [volume, setVolume] = useState(50)

  const [beatSound, setBeatSound] = useState<null | Pizzicato['Sound']>(null)
  const [toneSound, setToneSound] = useState<null | Pizzicato['Sound']>(null)

  const [isMounted, setIsMounted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  // const [minutes, setMinutes] = useState(10)
  // const duration = useMemo(() => minutes * 60, [minutes])

  const beatAndBaselineFrequency = useMemo(
    () => beatFrequency + baselineFrequency,
    [beatFrequency, baselineFrequency]
  )

  const createSound = (frequency: number): Pizzicato['Sound'] => {
    const sound = new Pizzicato.Sound({
      source: 'wave',
      options: {
        volume,
        frequency
      }
    })

    sound.volume = volume / 100

    return sound
  }

  const onPlayBeatAndBaseline = (): void => {
    if (beatSound) {
      beatSound.stop()
    }

    const newSound = createSound(beatAndBaselineFrequency)

    const leftPan = new Pizzicato.Effects.StereoPanner({
      pan: -1
    })

    setBeatSound(newSound)
    newSound.addEffect(leftPan)
    newSound.play()
  }

  const onPlayBaseline = (): void => {
    if (toneSound) {
      toneSound.stop()
    }

    const newSound = createSound(baselineFrequency)

    const rightPan = new Pizzicato.Effects.StereoPanner({
      pan: 1
    })

    setToneSound(newSound)
    newSound.addEffect(rightPan)
    newSound.play()
  }

  const onChangeState = () => {
    for (const [key, range] of Object.entries(STATE_RANGE)) {
      if (beatFrequency >= range[0] && beatFrequency <= range[1]) {
        setState(STATES[+key])
      }
    }
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    if (!isPlaying) {
      beatSound?.stop()
      toneSound?.stop()
    } else {
      onPlayBeatAndBaseline()
      onPlayBaseline()
    }
  }, [isPlaying])

  useEffect(() => {
    if (!isMounted || (!isFrequencyChanged && !isVolumeChanged)) return

    onChangeState()
    setIsPlaying(true)
    onPlayBeatAndBaseline()
    onPlayBaseline()

    setIsFrequencyChanged(false)
    setIsVolumeChanged(false)
  }, [isFrequencyChanged, isVolumeChanged])

  const onDynamicFrequency = (value: number, func: (freq: number) => void) => {
    setIsFrequencyChanged(true)
    func(value)
  }

  return (
    <div className="relative h-full">
      <AudioVisualizer
        isPlaying={isPlaying}
        togglePlaying={setIsPlaying}
        rightSide={beatAndBaselineFrequency}
        leftSide={baselineFrequency}
      />
      <div className="relative flex flex-col gap-[8px] pt-[22px]">
        <RangeSlider
          value={beatFrequency}
          label={'Beat Frequency'}
          postfix="Hz"
          min={0}
          max={40}
          onMouseUp={(v: number): void => onDynamicFrequency(v, setBeatFrequency)}
          setValue={(v: number): void => setBeatFrequency(v)}
        />
        <RangeSlider
          value={baselineFrequency}
          label={'Tone Frequency'}
          postfix="Hz"
          min={5}
          max={500}
          onMouseUp={(v: number): void => onDynamicFrequency(v, setBaselineFrequency)}
          setValue={(v: number): void => setBaselineFrequency(v)}
        />
        <RangeSlider
          value={volume}
          label={'Volume'}
          postfix="%"
          min={0}
          max={100}
          step={1}
          onMouseUp={(): void => setIsVolumeChanged(true)}
          setValue={(v: number): void => setVolume(v)}
        />
      </div>
    </div>
  )
}
