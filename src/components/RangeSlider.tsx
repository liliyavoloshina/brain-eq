import { useEffect, useState } from 'react'

interface Props {
  value: number
  label: string
  min: number
  max: number
  postfix: string
  setValue: (v: number) => void
  onMouseUp: (v: number) => void
  step?: number
}

export default function RangeSlider({ value, label, min, max, postfix, setValue, onMouseUp, step = 0.1 }: Props): JSX.Element {
  const [bgGradient, setBgGradient] = useState('')

  useEffect(() => {
    setBgGradient(
      `linear-gradient(to right, var(--primary) 0%, var(--primary) ${((value - min) / (max - min)) * 100}%, #FFFFFF33 ${((value - min) / (max - min)) * 100}%, #FFFFFF33 100%)`
    )
  }, [value])

  return (
    <div>
      <label htmlFor="range" className="flex justify-between mb-[5px] text-sm font-medium select-none">
        <div className="text-gray-10">{label}</div>
        <div className="text-gray-10 opacity-80">
          {value} {postfix}
        </div>
      </label>
      <input
        id="range"
        type="range"
        step={step}
        min={min}
        max={max}
        value={value}
        onInput={(e): void => setValue(+e.currentTarget.value)}
        onMouseUp={(e): void => {
          onMouseUp(+e.currentTarget.value)
        }}
        onTouchEnd={(e): void => {
          onMouseUp(+e.currentTarget.value)
        }}
        style={{ background: bgGradient }}
        className="w-full appearance-none rounded cursor-pointer [&::-webkit-slider-runnable-track]:w-full [&::-webkit-slider-runnable-track]:h-[7px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[20px] [&::-webkit-slider-thumb]:h-[20px] [&::-webkit-slider-thumb]:mt-[-6px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-10"
      />
    </div>
  )
}
