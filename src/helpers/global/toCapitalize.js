export const toCapitalize = (text = '') => {
  return text.trim().replace(/\s+/g, ' ').split(' ').map((word) => {
    return `${word?.slice(0, 1)?.toUpperCase()}${word?.slice(1)?.toLowerCase()}`
  }).join(' ')
}
