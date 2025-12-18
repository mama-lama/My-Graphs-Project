<script setup>
import { ref, watch } from 'vue'
import GridMap from './components/GridMap.vue'
import ControlPanel from './components/ControlPanel.vue'
import { findPath } from './logic/pathfinding/index'

const tab = ref('a_star')
const obstacles = ref({})
const cols = ref(20)
const rows = ref(20)
const editMode = ref(false)
const startPlacement = ref(false)
const finishPlacement = ref(false)
const startCell = ref(null)
const finishCell = ref(null)
const pathMap = ref({})
const pathFound = ref(false)
const pathLength = ref(0)

const recomputePath = () => {
  if (!startCell.value || !finishCell.value) {
    pathMap.value = {}
    pathFound.value = false
    pathLength.value = 0
    return
  }

  const { path, pathMap: map } = findPath({
    algorithm: tab.value,
    rows: rows.value,
    cols: cols.value,
    obstacles: obstacles.value,
    start: startCell.value,
    finish: finishCell.value,
  })

  pathMap.value = map || {}
  pathFound.value = Array.isArray(path) && path.length > 0
  pathLength.value = pathFound.value ? Math.max(0, path.length - 1) : 0
}

watch(
  [tab, obstacles, startCell, finishCell, rows, cols],
  recomputePath,
  { deep: true },
)
</script>

<template>
  <ControlPanel
    v-model:rows="rows"
    v-model:cols="cols"
    v-model:editMode="editMode"
    v-model:tab="tab"
    v-model:startCell="startPlacement"
    v-model:finishCell="finishPlacement"
    :path-found="pathFound"
    :path-length="pathLength"
  />

  <GridMap
    v-model:cols="cols"
    v-model:rows="rows"
    v-model:obstacles="obstacles"
    v-model:startCell="startCell"
    v-model:finishCell="finishCell"
    v-model:path="pathMap"
    :edit-mode="editMode"
    :start-placement="startPlacement"
    :finish-placement="finishPlacement"
  />
</template>

<style scoped></style>
