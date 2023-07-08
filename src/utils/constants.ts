import { State, Theme } from '../types/common'

export const STATES = ['sleep', 'meditation', 'learning', 'focus', 'awareness'] as State[]
export const THEMES = ['dark', 'light'] as Theme[]
export const STATE_RANGE = {
  0: [0.5, 4],
  1: [4, 8],
  2: [8, 13],
  3: [13, 30],
  4: [30, 40]
}

export const BG_STATE_COLOR = {
  0: 'bg-violet-10',
  1: 'bg-azure-10',
  2: 'bg-green-10',
  3: 'bg-canary-10',
  4: 'bg-orange-10'
}
export const TEXT_STATE_COLOR = {
  0: 'text-violet-10',
  1: 'text-azure-10',
  2: 'text-green-10',
  3: 'text-canary-10',
  4: 'text-orange-10'
}
