import { parseKey, getNeighbors4, makeKey, reconstructPath } from './utils'

export function deijkstra(startKey, goalKey, cols, rows, obstacleSet) {
  const dist = {}
  const visited = new Set()
  const cameFrom = {}

  dist[startKey] = 0

  // набор допустимых вершин (без препятствий)
  const nodes = []
  for (let c = 1; c <= cols; c++) {
    for (let r = 1; r <= rows; r++) {
      const k = makeKey(c, r)
      if (!obstacleSet.has(k)) {
        nodes.push(k)
        if (!(k in dist)) dist[k] = Infinity
      }
    }
  }

  while (visited.size < nodes.length) {
    let cur = null
    let best = Infinity

    for (const k of nodes) {
      if (visited.has(k)) continue
      if (dist[k] < best) {
        best = dist[k]
        cur = k
      }
    }

    if (cur === null || best === Infinity) break
    if (cur === goalKey) return reconstructPath(cameFrom, cur)

    visited.add(cur)
    const { col, row } = parseKey(cur)

    for (const n of getNeighbors4(col, row, cols, rows, obstacleSet)) {
      const nk = makeKey(n.col, n.row)
      if (visited.has(nk)) continue

      const alt = dist[cur] + 1
      if (alt < dist[nk]) {
        dist[nk] = alt
        cameFrom[nk] = cur
      }
    }
  }

  return null
}
