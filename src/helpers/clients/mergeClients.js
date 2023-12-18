import { sortArticles } from "../articles"

// id: first client
// name: second client
export const mergeClients = (clients = [], id = '', name = '') => {
  const mergedArticles = []
  const filteredClients = clients?.filter((client) => {
    // el cliente que ya tenia el nuevo nombre
    if (client?.name === name) {
      // se guardan sus articulos en los articulos unificados
      mergedArticles.push(...client.articles)
      // pero no se quita del arreglo de clientes
      return true
    }
    // el cliente al que se le cambio el nombre
    if (client?.id === id) {
      // se guardan sus articulos en los articulos unificados
      mergedArticles.push(...client.articles)
      // y si se quita del arreglo de clientes
      return false
    }
    // todos los demas clientes se retornan
    return true
  })
  // se agregan los articulos unificados al cliente que ya tenia el nuevo nombre
  return filteredClients?.map((client) => {
    return client?.name === name
      ? {
          ...client,
          articles: sortArticles(mergedArticles)
        }
      : client
  })
}
