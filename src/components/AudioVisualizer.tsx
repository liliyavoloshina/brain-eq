import PlayAction from '@/components/PlayAction'
import SineWave from './SineWave'
import StateChip from './StateChip'
import InfoButton from './buttons/InfoButton'
import { useContext } from 'react'
import { ModalsContext, StateContext } from '../utils/context'

interface Props {
  isPlaying: boolean
  rightSide: number
  leftSide: number
  togglePlaying: (status: boolean) => void
}

export default function AudioVisualizer(props: Props) {
  const { state } = useContext(StateContext)
  const { setIsInfoModalOpen } = useContext(ModalsContext)

  return (
    <div className="relative w-full h-[248px] mb-8 md:h-1/2" id="audio-visualizer-container">
      <div className="relative h-full rounded-3xl overflow-hidden">
        <div className="absolute inset-x-4 top-4 flex justify-center">
          <StateChip text={state} />
          <div className="absolute right-0">
            <InfoButton onClick={() => setIsInfoModalOpen(true)} />
          </div>
        </div>
        <SineWave
          leftFreq={props.leftSide}
          rightFreq={props.rightSide}
          isPlaying={props.isPlaying}
        />
      </div>
      <PlayAction {...props} />
    </div>
  )
}
