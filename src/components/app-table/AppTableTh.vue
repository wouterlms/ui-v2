<script setup lang="ts">
export interface Props {
  as?: string
}

withDefaults(defineProps<Props>(), {
  as: 'div',
})

const grid = inject('grid') as string
const border = inject('border') as boolean
const maxWidth = inject('maxWidth') as string
</script>

<template>
  <div
    :class="{
      'border-b border-solid border-tertiary bg-secondary': border,
    }"
  >
    <Component
      :is="as"
      :style="{
        'grid-template-columns': grid,
        maxWidth,
      }"
      class="flex-shrink-0
      font-medium
      gap-4
      grid
      mx-auto
      p-4
      sticky
      text-secondary
      top-0
      z-[1]"
    >
      <slot />
    </Component>
  </div>
</template>
