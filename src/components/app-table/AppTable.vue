<script setup lang="ts">
export interface Props {
  grid: string
}

const props = withDefaults(defineProps<Props>(), {})

provide('grid', computed(() => props.grid))
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <slot />
</template>
