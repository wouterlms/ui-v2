<script setup lang="ts">
import { useIsKeyboardMode } from '@/composables'

export interface Props {
  as?: string | Object
}

withDefaults(defineProps<Props>(), {
  as: 'button',
})

const isKeyboardMode = useIsKeyboardMode()
</script>

<template>
  <Component
    :is="as"
    :class="{
      'focus:ring': isKeyboardMode,
    }"
    type="button"
    class="duration-200 rounded"
  >
    <slot />
  </Component>
</template>
