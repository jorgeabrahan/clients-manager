export const groupArticles = (articles = []) => {
  const groups = []
  let group = []
  for (const article of articles) {
    group.push(article)
    if (group.length < 2) continue
    if (article?.price !== group[group.length - 2]?.price) {
      const extractedGroup = group.splice(0, group.length - 1)
      groups.push({
        amount: extractedGroup?.length,
        price: extractedGroup[0]?.price,
        articles: extractedGroup
      })
    }
  }
  groups.push({
    amount: group.length,
    price: group[0]?.price,
    articles: group
  })
  return groups
}
