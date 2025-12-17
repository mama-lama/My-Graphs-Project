<template>
    <div class="grid-map">
        <div class="grid-map-row" v-for="i in rows" :key="`row-${i}`">
            <GridMapCell v-for="j in cols" :key="`cell-${j}-${i}`" :size="size" :item="getCellState(j, i)"
                @click="onCellClick(j, i)">
            </GridMapCell>
        </div>
    </div>
</template>

<script setup>
import GridMapCell from "./GridMapCell.vue"

const props = defineProps({
    size: {
        type: Number,
    },
    editMode: {
        type: Boolean
    },
    startPlacement: {
        type: Boolean,
        default: false,
    },
    finishPlacement: {
        type: Boolean,
        default: false,
    }
})
const rows = defineModel('rows', {
    type: Number,
    default: 20,

})
const cols = defineModel('cols', {
    type: Number,
    default: 20,
})
const obstacles = defineModel('obstacles', {
    type: Object,
    default: () => ({}),
})
const startCell = defineModel('startCell', {
    type: Object,
    default: null,
})
const finishCell = defineModel('finishCell', {
    type: Object,
    default: null,
})
const path = defineModel('path', {
    type: Object,
    default: () => ({}),
})

const makeKey = (c, r) => `${c},${r}`

const getCellState = (col, row) => {
    const key = makeKey(col, row)

    const isObstacle = !!obstacles.value[key]
    const isStart =
        startCell.value &&
        startCell.value.col === col &&
        startCell.value.row === row
    const isFinish =
        finishCell.value &&
        finishCell.value.col === col &&
        finishCell.value.row === row
    const isPath = !!path.value[key]

    if (!isObstacle && !isStart && !isFinish && !isPath) {
        return null
    }

    return { isObstacle, isStart, isFinish, isPath }
}

const clearStartFinish = (col, row) => {
    if (startCell.value?.col === col && startCell.value?.row === row) {
        startCell.value = null
    }
    if (finishCell.value?.col === col && finishCell.value?.row === row) {
        finishCell.value = null
    }
}


const onCellClick = (col, row) => {
    if (!props.editMode) return

    if (props.startPlacement) {
        startCell.value = { col, row }
        return
    }

    if (props.finishPlacement) {
        finishCell.value = { col, row }
        return
    }

    const key = makeKey(col, row)
    const next = { ...obstacles.value }

    if (next[key]) {
        delete next[key]
    } else {
        clearStartFinish(col, row)
        next[key] = true
    }

    obstacles.value = next
}
</script>

<style>
.grid-map {
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}

.grid-map-row {
    display: flex;
    flex-wrap: nowrap;
}
</style>
