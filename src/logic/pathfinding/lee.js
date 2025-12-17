import { parseKey, getNeighbors4, makeKey, reconstructPath } from './utils'

export function lee(startKey, goalKey, cols, rows, obstacleSet) {
  // distance map: key -> distance
  const dist = {}
  const cameFrom = {}

  const queue = [startKey]
  dist[startKey] = 0

  while (queue.length > 0) {
    const cur = queue.shift()
    if (cur === goalKey) return reconstructPath(cameFrom, cur)

    const { col, row } = parseKey(cur)

    for (const n of getNeighbors4(col, row, cols, rows, obstacleSet)) {
      const nk = makeKey(n.col, n.row)

      if (dist[nk] !== undefined) continue // уже есть волна
      dist[nk] = dist[cur] + 1
      cameFrom[nk] = cur
      queue.push(nk)
    }
  }

  return null
}
