<template>
    <ul class="nav nav-tabs">
        <li
            v-for="item in items"
            :key="item.value"
            class="nav-item"
        >
            <a
                class="nav-link"
                :class="{
                    active: tab === item.value
                }"
                @click="tab = item.value"
            >
                {{ item.label }}
            </a>
        </li>
    </ul>
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