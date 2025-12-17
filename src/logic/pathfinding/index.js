import { makeKey, parseKey, buildObstacleSet } from './utils'
import { aStar } from './aStar'
import { deijkstra } from './deijkstra'
import { lee } from './lee'
import { greedy } from './greedy'
import { breadth } from './breadth'

export function findPath({ algorithm, rows, cols, obstacles, start, finish }) {
  if (!start || !finish) return { path: null, pathMap: {} }

  const startKey = makeKey(start.col, start.row)
  const goalKey = makeKey(finish.col, finish.row)
  const obstacleSet = buildObstacleSet(obstacles)

  let pathKeys = null

  switch (algorithm) {
    case 'a_star':
      pathKeys = aStar(startKey, goalKey, cols, rows, obstacleSet)
      break
    case 'deijkstra':
      pathKeys = deijkstra(startKey, goalKey, cols, rows, obstacleSet)
      break
    case 'lee':
      pathKeys = lee(startKey, goalKey, cols, rows, obstacleSet)
      break
    case 'greedy':
      pathKeys = greedy(startKey, goalKey, cols, rows, obstacleSet)
      break
    case 'breadth':
      pathKeys = breadth(startKey, goalKey, cols, rows, obstacleSet)
      break
    default:
      pathKeys = aStar(startKey, goalKey, cols, rows, obstacleSet)
  }

  if (!pathKeys) return { path: null, pathMap: {} }

  const pathMap = {}
  for (const k of pathKeys) pathMap[k] = true

  return { path: pathKeys.map(parseKey), pathMap }
}
