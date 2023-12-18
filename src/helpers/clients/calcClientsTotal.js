export const calcClientsTotal = (clients = []) => {
  if (clients.length === 0) return 0
  const clientsTotal = clients.reduce((currentClientsTotal, client) => {
    const articlesTotal = client.articles.reduce((currentTotal, article) => currentTotal + article.price, 0)
    return currentClientsTotal + articlesTotal
  }, 0)
  return clientsTotal
}
