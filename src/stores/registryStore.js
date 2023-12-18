import { create } from 'zustand'
import { v4 as uuid } from 'uuid'
import { toCapitalize, toLocalCurrency } from '../helpers/global'
import {
  addSortedClient,
  getClientById,
  getClientByName,
  isNewClient,
  mergeClients
} from '../helpers/clients'
import { createArticles, sortArticles } from '../helpers/articles'
import { getRecordById, getRecordIndexById } from '../helpers/history'

const HISTORY_ACTIONS = {
  remove: 'eliminar',
  update: 'actualizar',
  add: 'agregar',
  insert: 'insertar',
  merge: 'unificar',
  clear: 'limpiar'
}

const HISTORY_INSTRUCTION = {
  removed: 'client removed',
  nameChanged: 'client name changed',
  added: 'new client added',
  inserted: 'articles added to existing client',
  articlesRemoved: 'articles removed from client',
  merged: 'client merged',
  cleared: 'clients removed'
}

export const registryStore = create((set) => ({
  clients: [],
  history: [],
  activeRecordIndex: -1,
  showHistory: false,
  removeClient: (id) =>
    set((state) => {
      const removedClient = getClientById(state.clients, id)
      const updatedClients = state.clients.filter((client) => client.id !== id)
      return {
        ...state,
        activeRecordIndex: state.activeRecordIndex + 1,
        history: [
          ...state.history,
          {
            id: uuid(),
            currentClients: updatedClients,
            action: HISTORY_ACTIONS.remove,
            client: removedClient,
            details: {
              instruction: HISTORY_INSTRUCTION.removed,
              message: `${removedClient.name} eliminado`
            }
          }
        ],
        clients: updatedClients
      }
    }),
  updateClient: (id, editedClient) =>
    set((state) => {
      const previousClient = getClientById(state.clients, id)
      const updatedClients = addSortedClient(
        state.clients.filter((client) => client.id !== id),
        editedClient
      )
      return {
        ...state,
        activeRecordIndex: state.activeRecordIndex + 1,
        history: [
          ...state.history,
          {
            id: uuid(),
            currentClients: updatedClients,
            action: HISTORY_ACTIONS.update,
            client: previousClient,
            details: {
              instruction: HISTORY_INSTRUCTION.nameChanged,
              message: `${previousClient.name} actualizado a ${editedClient.name}`
            }
          }
        ],
        clients: updatedClients
      }
    }),
  addClient: ({ name, price, amount }) =>
    set((state) => {
      const capitalizedName = toCapitalize(name)
      const articles = createArticles(amount, price)
      const pluralAmount = amount > 1 ? 's' : ''
      if (isNewClient(state.clients, capitalizedName)) {
        const newClient = { id: uuid(), name: capitalizedName, articles }
        const updatedClients = addSortedClient([...state.clients], newClient)
        return {
          ...state,
          activeRecordIndex: state.activeRecordIndex + 1,
          history: [
            ...state.history,
            {
              id: uuid(),
              currentClients: updatedClients,
              action: HISTORY_ACTIONS.add,
              client: newClient,
              details: {
                instruction: HISTORY_INSTRUCTION.added,
                message: `${
                  newClient.name
                } agregado con ${amount} articulo${pluralAmount} de ${toLocalCurrency(price)}`
              }
            }
          ],
          clients: updatedClients
        }
      }
      // if client already exists
      const existingClient = getClientByName(state.clients, capitalizedName)
      const updatedClients = state.clients.map((client) => {
        // if client to be updated was found
        if (client.name === capitalizedName)
          return { ...client, articles: sortArticles([...client.articles, ...articles]) }
        return client // otherwise leave client as it is
      })
      return {
        ...state,
        activeRecordIndex: state.activeRecordIndex + 1,
        history: [
          ...state.history,
          {
            id: uuid(),
            currentClients: updatedClients,
            action: HISTORY_ACTIONS.insert,
            client: existingClient,
            details: {
              instruction: HISTORY_INSTRUCTION.inserted,
              message: `${
                existingClient.name
              } actualizado con ${amount} articulo${pluralAmount} de ${toLocalCurrency(price)}`
            }
          }
        ],
        clients: updatedClients
      }
    }),
  removeArticles: (id, price, amount) =>
    set((state) => {
      let articlesRemoved = 0
      const existingClient = getClientById(state.clients, id)
      const pluralAmount = amount > 1 ? 's' : ''
      const updatedClients = state?.clients?.map((client) => {
        if (client?.id !== id) return client
        return {
          ...client,
          articles: client?.articles?.filter((article) => {
            if (article?.price !== price || articlesRemoved === amount) return true
            articlesRemoved++
            return false
          })
        }
      })
      return {
        ...state,
        activeRecordIndex: state.activeRecordIndex + 1,
        history: [
          ...state.history,
          {
            id: uuid(),
            currentClients: updatedClients,
            action: HISTORY_ACTIONS.update,
            client: existingClient,
            details: {
              instruction: HISTORY_INSTRUCTION.articlesRemoved,
              message: `${
                existingClient.name
              } eliminado${pluralAmount} ${amount} articulo${pluralAmount} de ${toLocalCurrency(
                price
              )}`
            }
          }
        ],
        clients: updatedClients
      }
    }),
  mergeClients: (id, name) =>
    set((state) => {
      const clientToRemove = getClientById(state.clients, id)
      const clientToPreserve = getClientByName(state.clients, name)
      const updatedClients = mergeClients(state?.clients, id, name)
      return {
        ...state,
        activeRecordIndex: state.activeRecordIndex + 1,
        history: [
          ...state.history,
          {
            id: uuid(),
            currentClients: updatedClients,
            action: HISTORY_ACTIONS.merge,
            client: clientToRemove,
            details: {
              instruction: HISTORY_INSTRUCTION.merged,
              message: `${clientToRemove.name} unificado con ${clientToPreserve.name}`
            }
          }
        ],
        clients: updatedClients
      }
    }),
  clearClients: () =>
    set((state) => ({
      ...state,
      activeRecordIndex: state.activeRecordIndex + 1,
      history: [
        ...state.history,
        {
          id: uuid(),
          currentClients: [],
          action: HISTORY_ACTIONS.clear,
          client: null,
          details: {
            instruction: HISTORY_INSTRUCTION.cleared,
            message: `Todos los clientes eliminados`
          }
        }
      ],
      clients: []
    })),
  rollback: (recordId) =>
    set((state) => {
      const recordClients = getRecordById(state.history, recordId)
      const recordIndex = getRecordIndexById(state.history, recordId)
      return {
        ...state,
        activeRecordIndex: recordIndex,
        clients: recordClients === null ? state.clients : recordClients?.currentClients
      }
    }),
  overwriteHistory: () =>
    set((state) => ({ ...state, history: state.history.slice(0, state.activeRecordIndex + 1) })),
  setShowHistory: (showHistory) => set((state) => ({ ...state, showHistory }))
}))
