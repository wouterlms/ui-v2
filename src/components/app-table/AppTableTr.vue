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
  <Component
    :is="as"
    :class="{
      'border-b border-solid border-tertiary': border,
    }"
    class="last:border-none"
  >
    <div
      :style="{
        'grid-template-columns': grid,
        maxWidth,
      }"
      class="gap-4
      grid
      items-center
      mx-auto
      p-4
      text-secondary"
    >
      <slot />
    </div>
  </Component>
</template>
