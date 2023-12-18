export const getClientByName = (clients = [], name = '') => {
  const client = clients.find(client => client.name === name)
  return client === undefined ? null : client
}
