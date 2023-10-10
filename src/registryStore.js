import { create } from 'zustand'
import { v4 as uuid } from 'uuid'
import { toCapitalize } from './helpers/global'
import { isNewClient } from './helpers/clients'
import { createArticles, sortArticles } from './helpers/articles'

export const registryStore = create((set) => ({
  clients: [],
  addClient: ({ name, price, amount }) =>
    set((state) => {
      const capitalizedName = toCapitalize(name)
      const articles = createArticles(amount, price)
      if (isNewClient(state.clients, capitalizedName)) {
        const newClient = { id: uuid(), name: capitalizedName, articles }
        return { ...state, clients: [...state.clients, newClient] }
      }
      // if client already exists
      return {
        ...state,
        clients: state.clients.map((client) => {
          // if client to be updated was found
          if (client.name === capitalizedName)
            return { ...client, articles: sortArticles([...client.articles, ...articles]) }
          return client // otherwise leave client as it is
        })
      }
    }),
  sortClients: () =>
    set((state) => {
      return {
        ...state,
        clients: state.clients.sort((a, b) => {
          const nameA = a?.name?.toLowerCase()
          const nameB = b?.name?.toLowerCase()
          if (nameA > nameB) return 1
          if (nameA < nameB) return -1
          return 0
        })
      }
    })
}))
