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
                <input type="checkbox" v-model="startCell">
                <span>Поставить старт</span>
            </label>
            <label class="grid-map-panel-item">
                <input type="checkbox" v-model="finishCell">
                <span>Поставить финиш</span>
            </label>
            <UITabs v-model="tab" :items="tabs" />
        </div>
    </header>
</template>

<script setup>
    import UITabs from './ui/UITabs.vue'

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
    const start = defineModel('start', {
        type: Boolean,
        default: true,
    })
    const finish = defineModel('finish', {
        type: Boolean,
        default: true,
    })

    const tabs = [
        { label: 'A*', value: 'a_star' },
        { label: 'Дейкстра', value: 'deijkstra' },
        { label: 'Алгоритм Ли', value: 'lee' },
        { label: 'Жадный поиск', value: 'greedy' },
        { label: 'В глубину', value: 'breadth' }
    ]
</script>

<style>
    .grid-map-panel {
        display: flex;
        gap: 12px;
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
</style>
