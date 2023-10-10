export const calcArticlesTotal = (articles) =>  articles.reduce((acc, current) => acc + current?.price, 0);
