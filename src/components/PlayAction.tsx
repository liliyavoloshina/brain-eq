import { ReactComponent as PlayIcon } from '@/assets/icons/PlayIcon.svg'
import { ReactComponent as PauseIcon } from '@/assets/icons/PauseIcon.svg'

interface Props {
  isPlaying: boolean
  rightSide: number
  leftSide: number
  togglePlaying: (status: boolean) => void
}

export default function PlayAction({
  isPlaying,
  rightSide,
  leftSide,
  togglePlaying
}: Props): JSX.Element {
  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    togglePlaying(!isPlaying)
    e.currentTarget.blur()
  }

  return (
    <div className="absolute bottom-[-32px] left-0 right-0 flex justify-center items-center h-[64px] w-3/4 m-auto">
      <div className="flex items-center justify-center w-[80px] h-[24px] bg-primary-muted mr-[-5px] px-[10px] rounded-tl-[22px] rounded-bl-[22px] text-primary-light text-[10px] font-semibold">
        {+leftSide.toFixed(1)} HZ
      </div>
      <button
        className="flex justify-center items-center w-[64px] h-[64px] bg-primary rounded-full shadow-11 z-10 hover:brightness-105 focus:brightness-90"
        onClick={onClick}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
      <div className="flex items-center justify-center w-[80px] h-[24px] bg-primary-muted ml-[-5px] px-[10px] rounded-tr-[22px] rounded-br-[22px] text-primary-light text-[10px] font-semibold">
        {+rightSide.toFixed(1)} HZ
      </div>
    </div>
  )
}
