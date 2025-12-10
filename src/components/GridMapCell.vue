<template>
    <div 
        class="grid-map-cell" 
        :style="{
            width: size + 'px',
            height: size + 'px',
            borderColor: color,
            background: item ? color : 'transparent'
        }"
        @click="$emit('click')">
        <slot />
    </div>
</template>

<script setup>
    defineEmits(
        ["click"]
    )
    defineProps({
        size: {
            type: Number,
            default: 30,
        },
        color: {
            type: String,
            default: "pink",
        },
        item: {
            type: Object,
        }
    })
</script>

<style>
    .grid-map-cell {
        border: 1px solid;
    }
</style>
