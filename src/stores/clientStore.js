import { create } from 'zustand'

export const clientStore = create((set) => ({
  editClientId: null,
  registryClient: null,
  setEditClientId: (editClientId) => set((state) => ({ ...state, editClientId })),
  setRegistryClient: (registryClient) => set((state) => ({ ...state, registryClient }))
}))
