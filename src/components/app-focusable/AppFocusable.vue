<script setup lang="ts">
import { useIsKeyboardMode } from '@/composables'

interface Props {
  is?: string | Object
}

withDefaults(defineProps<Props>(), {
  is: 'button',
})

const isKeyboardMode = useIsKeyboardMode()
</script>

<template>
  <Component
    :is="is"
    :class="{
      'focus:ring': isKeyboardMode,
    }"
    type="button"
    class="duration-200 rounded"
  >
    <slot />
  </Component>
</template>
