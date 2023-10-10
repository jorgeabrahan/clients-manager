import {v4 as uuid} from 'uuid'

export const createArticles = (amount, price) => {
  const articles = []
  for (let i = 1; i <= Number(amount); i++) articles.push({ id: uuid(), price: Number(price) })
  return articles
}
