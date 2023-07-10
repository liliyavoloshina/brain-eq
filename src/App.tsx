import PlayerView from './views/PlayerView'
import { useState } from 'react'
import { StateContext, ModalsContext, FrequencyContext } from './utils/context'
import { STATES, THEMES } from './utils/constants'
import InfoModal from './components/InfoModal'
import TheFooter from './components/TheFooter'

export default function App(): JSX.Element {
  const [state, setState] = useState(STATES[0])
  const [theme] = useState(THEMES[0])

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isFrequencyChanged, setIsFrequencyChanged] = useState(false)
  const [beatFrequency, setBeatFrequency] = useState(3)
  const [baselineFrequency, setBaselineFrequency] = useState(250)

  return (
    <StateContext.Provider
      value={{
        state,
        setState
      }}
    >
      <ModalsContext.Provider
        value={{
          isInfoModalOpen,
          setIsInfoModalOpen
        }}
      >
        <FrequencyContext.Provider
          value={{
            beatFrequency,
            setBeatFrequency,
            baselineFrequency,
            setBaselineFrequency,
            isFrequencyChanged,
            setIsFrequencyChanged
          }}
        >
          <div className={['h-full relative overflow-hidden', `theme-${theme}`, `state-${state}`].join(' ')} id="colors-container">
            <div className="absolute m-auto top-[-50px] left-0 right-0 w-[150%] h-[100%] bg-radial-gradient opacity-30"></div>
            <div className="bg-primary-bg h-full">
              <div className="container h-full mx-auto px-8 pt-8">
                <PlayerView></PlayerView>
              </div>
              <TheFooter />

              <InfoModal isOpen={isInfoModalOpen} />
            </div>
          </div>
        </FrequencyContext.Provider>
      </ModalsContext.Provider>
    </StateContext.Provider>
  )
}
