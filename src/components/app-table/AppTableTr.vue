<script setup lang="ts">
export interface Props {
  as?: string
}

withDefaults(defineProps<Props>(), {
  as: 'div',
})

const grid = inject('grid') as string
const border = inject('border') as boolean
</script>

<template>
  <Component
    :is="as"
    :class="{
      'border-b border-solid border-tertiary': border,
    }"
    :style="{
      'grid-template-columns': grid,
    }"
    class="gap-4
      grid
      items-center
      last:border-none
      p-4
      text-secondary"
  >
    <slot />
  </Component>
</template>
