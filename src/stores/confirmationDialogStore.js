import { create } from 'zustand'

export const confirmationDialogStore = create((set) => ({
  dialogData: {
    title: '',
    message: '',
    onConfirm: () => {},
    onCancel: () => {}
  },
  setDialogData: (dialogData) => set((state) => ({ ...state, dialogData }))
}))
