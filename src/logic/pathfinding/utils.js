export const makeKey = (col, row) => `${col},${row}`

export const parseKey = key => {
  const [col, row] = key.split(',').map(Number)
  return { col, row }
}

export const manhattan = (aC, aR, bC, bR) =>
  Math.abs(aC - bC) + Math.abs(aR - bR)

export const getNeighbors4 = (col, row, cols, rows, obstacleSet) => {
  const all = [
    { col: col + 1, row },
    { col: col - 1, row },
    { col, row: row + 1 },
    { col, row: row - 1 },
  ]

  return all.filter(p => {
    if (p.col < 1 || p.col > cols) return false
    if (p.row < 1 || p.row > rows) return false
    return !obstacleSet.has(makeKey(p.col, p.row))
  })
}

export const reconstructPath = (cameFrom, currentKey) => {
  const out = [currentKey]
  let cur = currentKey
  while (cameFrom[cur]) {
    cur = cameFrom[cur]
    out.push(cur)
  }
  return out.reverse()
}

export const buildObstacleSet = (obstaclesObj) =>
  new Set(Object.keys(obstaclesObj || {}).filter(k => obstaclesObj[k]))
