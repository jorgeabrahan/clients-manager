import { create } from 'zustand'

export const sideBarStore = create((set) => ({
  buttons: [],
  setButtons: (buttons) => set((state) => ({ ...state, buttons: buttons }))
}))
