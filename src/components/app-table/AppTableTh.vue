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
      'border-b border-solid border-tertiary bg-secondary': border,
    }"
    :style="{
      'grid-template-columns': grid,
    }"
    class="flex-shrink-0
      font-medium
      gap-4
      grid
      p-4
      sticky
      text-secondary
      top-0
      z-[1]"
  >
    <slot />
  </Component>
</template>
