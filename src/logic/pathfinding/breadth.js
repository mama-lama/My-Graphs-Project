import { parseKey, getNeighbors4, makeKey, reconstructPath } from './utils'

export function breadth(startKey, goalKey, cols, rows, obstacleSet) {
  const queue = [startKey]
  const visited = new Set([startKey])
  const cameFrom = {}

  while (queue.length > 0) {
    const cur = queue.shift()
    if (cur === goalKey) return reconstructPath(cameFrom, cur)

    const { col, row } = parseKey(cur)

    for (const n of getNeighbors4(col, row, cols, rows, obstacleSet)) {
      const nk = makeKey(n.col, n.row)
      if (visited.has(nk)) continue

      visited.add(nk)
      cameFrom[nk] = cur
      queue.push(nk)
    }
  }

  return null
}
