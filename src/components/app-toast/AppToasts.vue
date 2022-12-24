<script setup lang="ts">
// Library imports

// Library type imports

// Relative imports

// Store imports
// Service imports
// Composable imports

// Enum imports
// Type imports

// Spread composables
// Composables
import { useToasts } from '@/composables'

// Refs

// Computed properties

// Functions

// Hooks

const { toast } = useToasts()

const showToast = computed(() => toast.value !== null)
</script>

<template>
  <Transition
    name="toast-transition"
    mode="out-in"
  >
    <div
      v-if="showToast"
      :key="toast.id"
      class="-translate-x-1/2
        bg-primary-inverted
        bottom-6
        fixed
        left-1/2
        px-2.5
        py-2
        rounded
        text-primary-inverted
        text-sm
        z-20"
    >
      {{ toast.message }}
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.toast-transition {
  &-enter-active,
  &-leave-active {
    transition: 0.3s
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }

  &-enter-from {
    transform: translate(-50%, 70%);
  }
}
</style>
