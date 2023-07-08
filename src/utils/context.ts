import { createContext } from 'react'
import { STATES } from './constants'
import { State } from '../types/common'

type StateContext = {
  state: State
  setState: (state: State) => void
}

type ModalsContext = {
  isInfoModalOpen: boolean
  setIsInfoModalOpen: (status: boolean) => void
}

type FrequencyContext = {
  isFrequencyChanged: boolean
  beatFrequency: number
  baselineFrequency: number
  setIsFrequencyChanged: (status: boolean) => void
  setBaselineFrequency: (freq: number) => void
  setBeatFrequency: (freq: number) => void
}

export const StateContext = createContext<StateContext>({
  state: STATES[0],
  setState: () => {}
})

export const ModalsContext = createContext<ModalsContext>({
  isInfoModalOpen: false,
  setIsInfoModalOpen: () => {}
})

export const FrequencyContext = createContext<FrequencyContext>({
  isFrequencyChanged: false,
  beatFrequency: 10,
  baselineFrequency: 250,
  setIsFrequencyChanged: () => {},
  setBeatFrequency: () => {},
  setBaselineFrequency: () => {}
})
