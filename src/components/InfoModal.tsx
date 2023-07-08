import CloseButton from './buttons/CloseButton'
import { useContext, useMemo } from 'react'
import { FrequencyContext, ModalsContext, StateContext } from '../utils/context'
import { ReactComponent as HeadphoneGuy } from '@/assets/icons/HeadphoneGuy.svg'
import { ReactComponent as WarningIcon } from '@/assets/icons/WarningIcon.svg'
import { BG_STATE_COLOR, STATE_RANGE, STATES, TEXT_STATE_COLOR } from '../utils/constants'
import StateChip from './StateChip'

interface Props {
  isOpen: boolean
}

export default function InfoModal({ isOpen }: Props) {
  const { setIsInfoModalOpen } = useContext(ModalsContext)
  const { state } = useContext(StateContext)

  const { beatFrequency, baselineFrequency, setBeatFrequency, setIsFrequencyChanged } =
    useContext(FrequencyContext)

  const activeKey = useMemo(() => {
    return STATES.indexOf(state)
  }, [state])

  const onChangeFrequency = (stateKey: string) => {
    setIsFrequencyChanged(true)
    setBeatFrequency(STATE_RANGE[stateKey][0])
  }

  return (
    <div
      className={[
        isOpen ? 'fixed' : 'hidden',
        'inset-0 bg-gray-100/[0.77] z-10 backdrop-blur-md'
      ].join(' ')}
    >
      <div className="flex justify-end px-4 pt-4">
        <CloseButton onClick={() => setIsInfoModalOpen(false)} />
      </div>
      <div className="flex flex-col items-center px-8">
        <div className="text-gray-20 text-center">
          <h1 className="text-2xl font-bold">How does it work?</h1>
          <p className="max-w-[320px] text-sm font-medium mt-[12px] mb-6">
            Binaural beats are auditory illusions created by playing two slightly different
            frequencies in each ear.
          </p>
        </div>

        <div className="flex items-center justify-between gap-8">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-[40px] w-[40px] bg-gray-10 text-gray-100 text-base font-bold rounded-full">
              R
            </div>
            <div className="mt-2 text-gray-20 text-xs font-bold">
              {+baselineFrequency.toFixed(1)} Hz
            </div>
          </div>
          <div className="flex flex-col items-center">
            <HeadphoneGuy />
            <div className="mt-2 text-gray-20 text-xs font-bold">
              {+beatFrequency.toFixed(1)} Hz
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-[40px] w-[40px] bg-gray-10 text-gray-100 text-base font-bold rounded-full">
              L
            </div>
            <div className="mt-2 text-gray-20 text-xs font-bold">
              {+(beatFrequency + baselineFrequency).toFixed(1)} Hz
            </div>
          </div>
        </div>

        <div className="flex gap-3 items-center mt-3.5">
          <div>
            <WarningIcon />
          </div>
          <p className="max-w-[270px] text-warning text-xs font-medium leading-[18px]">
            Please note that headphones are necessary for desired effects when using binaural beats.
          </p>
        </div>

        <div className="relative w-full max-w-[360px] flex justify-between mt-14">
          {Object.entries(STATE_RANGE).map(([key, range], idx, arr) => {
            return (
              <button
                key={key}
                className={`relative w-4 h-4 rounded-full z-20 ${BG_STATE_COLOR[key]}`}
                onClick={() => onChangeFrequency(key)}
              >
                <div
                  className={`absolute bottom-5 left-[-6px] text-xs font-semibold whitespace-nowrap ${TEXT_STATE_COLOR[key]}`}
                >
                  {range[0]}
                  {idx + 1 === arr.length && '+'} Hz
                </div>
                {+key === activeKey && (
                  <span className="absolute inset-center z-10 h-[10px] w-[10px] bg-gray-10 rounded-full pointer-events-none"></span>
                )}
              </button>
            )
          })}
          <div className="absolute right-0 left-0 top-1/2 h-[2px] bg-gradient-to-l from-orange-10 to-violet-10 via-[#FFD954_24.94%,_#65FF62_49.87%,_#4ADEFF_74.63%]"></div>
        </div>

        <div className="flex flex-wrap justify-center max-w-[380px] mt-[35px] gap-4 mx-[-10px]">
          {STATES.map((text) => (
            <div key={text} className="flex-1 max-w-[118px]">
              <StateChip text={text} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
