<template>
    
</template>

<script setup>
    defineProps({
        items: {
            type: Array,
            required: true
        }
    })
    const tab = defineModel({
        type: [String, Number]
    })
</script>