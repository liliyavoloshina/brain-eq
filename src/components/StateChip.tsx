import { STATES, TEXT_STATE_COLOR } from '../utils/constants'
import { useMemo } from 'react'

export type State = 'sleep' | 'meditation' | 'learning' | 'focus' | 'awareness'

interface Props {
  text: State
}

export default function StateChip({ text }: Props) {
  const activeKey = useMemo(() => {
    return STATES.indexOf(text)
  }, [text])

  const beforeBg = {
    0: 'before:bg-violet-10',
    1: 'before:bg-azure-10',
    2: 'before:bg-green-10',
    3: 'before:bg-canary-10',
    4: 'before:bg-orange-10'
  }

  return (
    <div
      className={`relative flex justify-center px-8 py-1.5 rounded-3xl before:absolute before:content-[''] before:block ${beforeBg[activeKey]} before:inset-0 before:rounded-3xl before:opacity-20`}
    >
      <div className={`${TEXT_STATE_COLOR[activeKey]} uppercase text-xs font-bold text-center`}>
        {text}
      </div>
    </div>
  )
}
