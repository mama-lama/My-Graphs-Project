import { parseKey, manhattan, getNeighbors4, makeKey, reconstructPath } from './utils'

export function aStar(startKey, goalKey, cols, rows, obstacleSet) {
  const open = new Set([startKey])
  const cameFrom = {}

  const g = { [startKey]: 0 }
  const f = { [startKey]: 0 }

  const goal = parseKey(goalKey)

  while (open.size > 0) {
    let cur = null
    let best = Infinity

    for (const k of open) {
      const fk = f[k] ?? Infinity
      if (fk < best) {
        best = fk
        cur = k
      }
    }

    if (!cur) break
    if (cur === goalKey) return reconstructPath(cameFrom, cur)

    open.delete(cur)
    const { col, row } = parseKey(cur)

    for (const n of getNeighbors4(col, row, cols, rows, obstacleSet)) {
      const nk = makeKey(n.col, n.row)
      const tentative = (g[cur] ?? Infinity) + 1

      if (tentative < (g[nk] ?? Infinity)) {
        cameFrom[nk] = cur
        g[nk] = tentative
        f[nk] = tentative + manhattan(n.col, n.row, goal.col, goal.row)
        open.add(nk)
      }
    }
  }

  return null
}
