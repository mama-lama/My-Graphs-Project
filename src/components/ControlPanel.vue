<template>
    <header>
        <div class="grid-map-panel">
            <label class="grid-map-panel-item">
                <span>Строк:</span>
                <input type="number" min="2" max="30" v-model.number.lazy="rows">
            </label>

            <label class="grid-map-panel-item">
                <span>Столбцов:</span>
                <input type="number" min="2" max="30" v-model.number.lazy="cols">
            </label>

            <label class="grid-map-panel-item">
                <input type="checkbox" v-model="editMode">
                <span>Режим редактирования</span>
            </label>

            <label class="grid-map-panel-item">
                <input type="checkbox" v-model="startPlacement">
                <span>Поставить старт</span>
            </label>

            <label class="grid-map-panel-item">
                <input type="checkbox" v-model="finishPlacement">
                <span>Поставить финиш</span>
            </label>

            <UITabs v-model="tab" :items="tabs" />

            <div class="grid-map-panel-item path-info">
                <span v-if="!pathFound">Путь: —</span>
                <span v-else>Длина пути: {{ pathLength }}</span>
            </div>
        </div>
    </header>
</template>


<script setup>
import { watch } from 'vue'
import UITabs from './ui/UITabs.vue'

defineProps({
    pathFound: { type: Boolean, default: false },
    pathLength: { type: Number, default: 0 },
})

const rows = defineModel('rows', {
    type: Number,
    default: 20,
    set: v => {
        if (v > 30)
            return 30
        if (v < 2)
            return 2
        return v
    }
})
const cols = defineModel('cols', {
    type: Number,
    default: 20,
    set: v => {
        if (v > 30)
            return 30
        if (v < 2)
            return 2
        return v
    }
})
const editMode = defineModel('editMode', {
    type: Boolean,
    default: false,
})
const tab = defineModel('tab', {
    type: [Number, String],
    required: 'a_star'
})
const startPlacement = defineModel('startCell', {
    type: Boolean,
    default: false,
})
const finishPlacement = defineModel('finishCell', {
    type: Boolean,
    default: false,
})

watch(
    () => startPlacement.value,
    value => {
        if (value) {
            finishPlacement.value = false
        }
    }
)

watch(
    () => finishPlacement.value,
    value => {
        if (value) {
            startPlacement.value = false
        }
    }
)

watch(
  () => editMode.value,
  v => {
    if (!v) {
      startPlacement.value = false
      finishPlacement.value = false
    }
  },
)

const tabs = [
    { label: 'A*', value: 'a_star' },
    { label: 'Дейкстра', value: 'deijkstra' },
    { label: 'Алгоритм Ли', value: 'lee' },
    { label: 'Жадный поиск', value: 'greedy' },
    { label: 'BFS', value: 'breadth' }
]
</script>

<style>
.grid-map-panel {
    display: flex;
    gap: 10px;
    padding: 10px;
    align-items: center;
    margin-bottom: 12px;
    flex-wrap: wrap;
}

.grid-map-panel-item {
    display: flex;
    gap: 6px;
    align-items: center;
    font-size: 14px;
}

.grid-map-panel-item input[type="number"] {
    width: 70px;
    padding: 2px 4px;
}

.path-info {
  margin-left: auto;
  font-weight: 600;
}
</style>
