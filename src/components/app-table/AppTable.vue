<script setup lang="ts">
export interface Props {
  grid: string
  border?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  border: true,
})

provide('grid', props.grid)
provide('border', props.border)
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <slot />
</template>
