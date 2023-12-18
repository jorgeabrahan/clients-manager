export const getRecordById = (history, recordId) => {
  const record = history.find(record => record.id === recordId)
  return record === undefined ? null : record
}
