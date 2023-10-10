export const isNewClient = (clients, name) => {
  return !clients.some(client => client.name === name)
}
