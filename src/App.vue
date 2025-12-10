<script setup>
  import { ref } from 'vue'
  import GridMap from './components/GridMap.vue'
  import ControlPanel from './components/ControlPanel.vue'

  const tab = ref('a_star')
  const obstacles = ref({})
  const cols = ref(20)
  const rows = ref(20)
  const editMode = ref(false)
</script>

<template>
  <ControlPanel
    v-model:rows="rows"
    v-model:cols="cols"
    v-model:editMode="editMode"
    v-model:tab="tab"
  />

  <GridMap
    v-model:cols="cols"
    v-model:rows="rows"
    :edit-mode="editMode"
    :obstacles="obstacles"
  >
    <template #cell="{ row, col }">
      <div v-if="row === 4 && col === 3"> ^*^</div>
    </template>
  </GridMap>
</template>

<style scoped>
</style>
