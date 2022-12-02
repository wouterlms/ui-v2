<script setup lang="ts">
export interface Props {
  grid: string
  border?: boolean
  maxWidth?: string
}

const props = withDefaults(defineProps<Props>(), {
  border: true,
  maxWidth: '100%',
})

provide('grid', props.grid)
provide('border', props.border)
provide('maxWidth', props.maxWidth)
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <slot />
</template>
