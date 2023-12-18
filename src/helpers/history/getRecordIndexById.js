export const getRecordIndexById = (history, recordId) => {
  const recordIndex = history.findIndex(record => record.id === recordId)
  return recordIndex === undefined ? null : recordIndex
}
