<template>
    <div class="grid-map-cell" :style="{
        width: size + 'px',
        height: size + 'px',
        borderColor: borderColor,
        background: backgroundColor,
    }" @click="$emit('click')">
        <slot />
    </div>
</template>

<script setup>
import { computed } from 'vue'

defineEmits(
    ["click"]
)
const props = defineProps({
    size: {
        type: Number,
        default: 30,
    },
    item: {
        type: Object,
    }
})
const borderColor = computed(() => {
    if (!props.item) return '#999'
    if (props.item.isStart) return 'green'
    if (props.item.isFinish) return 'blue'
    if (props.item.isPath) return 'gold'
    if (props.item.isObstacle) return 'pink'
    return '#999'
})

const backgroundColor = computed(() => {
    if (!props.item) return 'transparent'
    if (props.item.isStart) return 'green'
    if (props.item.isFinish) return 'blue'
    if (props.item.isPath) return 'gold'
    if (props.item.isObstacle) return 'pink'
    return 'transparent'
})
</script>

<style>
.grid-map-cell {
    border: 1px solid;
}
</style>
