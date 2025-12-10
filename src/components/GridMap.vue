<template>
    <div class="grid-map">
        <div class="grid-map-row" v-for="i in rows">
            <GridMapCell    
                v-for="j in cols" 
                :size="size" 
                :item="obstacles[[j, i]]"
                @click="onCellClick(j, i)"
            >
                <slot name="cell" :col="j" :row="i" />
            </GridMapCell>
        </div>
    </div>
</template>

<script setup>
    import GridMapCell from "./GridMapCell.vue"
    import {ref, watch} from "vue"
    
    const props = defineProps({
        size: {
            type: Number,
        },
        editMode: {
            type: Boolean
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

    const emit = defineEmits(['update:cols', 'update:rows'])

    watch([() => props.cols, () => props.rows], () => {
        for (const key in props.obstacles) {
            const [x, y] = key.split(',').map(n => parseInt(n))
            if (x > props.cols || y > props.rows) {
                delete props.obstacles[key]
            }
        }
    })

    function onCellClick(x, y) {
        if (!props.editMode) return

        const key = [x, y]
        if (props.obstacles[key]) {
            delete props.obstacles[key]
        } else {
            props.obstacles[key] = {}
        }
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
