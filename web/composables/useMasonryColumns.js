export function useMasonryColumns(items, numCols = 2) {
  const getColIndex = (i) => {
    const n = Math.max(1, toValue(numCols) || 1)
    return i % n
  }

  const columns = computed(() => {
    const src = toValue(items) || []
    const n = Math.max(1, toValue(numCols) || 1)
    const cols = Array.from({ length: n }, () => [])
    src.forEach((item, i) => cols[getColIndex(i)].push(item))
    return cols
  })

  return { columns, getColIndex }
}