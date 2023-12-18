export const getClientById = (clients = [], id = '') => {
  const client = clients.find(client => client.id === id)
  return client === undefined ? null : client
}
