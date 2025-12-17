import { parseKey, manhattan, getNeighbors4, makeKey, reconstructPath } from './utils'

export function greedy(startKey, goalKey, cols, rows, obstacleSet) {
  const open = new Set([startKey])
  const cameFrom = {}

  const goal = parseKey(goalKey)

  while (open.size > 0) {
    let cur = null
    let bestH = Infinity

    for (const k of open) {
      const { col, row } = parseKey(k)
      const h = manhattan(col, row, goal.col, goal.row)
      if (h < bestH) {
        bestH = h
        cur = k
      }
    }

    if (!cur) break
    if (cur === goalKey) return reconstructPath(cameFrom, cur)

    open.delete(cur)
    const { col, row } = parseKey(cur)

    for (const n of getNeighbors4(col, row, cols, rows, obstacleSet)) {
      const nk = makeKey(n.col, n.row)

      // чтобы не зациклиться, используем cameFrom как маркер "видели"
      if (nk === startKey) continue
      if (cameFrom[nk]) continue

      cameFrom[nk] = cur
      open.add(nk)
    }
  }

  return null
}
