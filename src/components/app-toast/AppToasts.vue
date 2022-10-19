<script setup lang="ts">
import { ref } from 'vue'

import AppToast from './AppToast.vue'

import { useToasts } from '@/composables'

enum Transition {
  TO_RIGHT = 'toast-transition-to-right',
  TO_BOTTOM = 'toast-transition-to-bottom',
}

const {
  toasts,
  removeToast,
} = useToasts()

const transition = ref(Transition.TO_BOTTOM)
</script>

<template>
  <div class="bottom-12 fixed right-20 w-96 z-10">
    <TransitionGroup :name="transition">
      <AppToast
        v-for="toast of toasts"
        :key="toast.id"
        :accent-color="toast.accentColor"
        :icon="toast.icon"
        class="mt-2 toast-transition-item"
        @close="removeToast(toast)"
        @action="toast.action?.onClick()"
      >
        <template #title>
          {{ toast.title }}
        </template>

        <template #message>
          {{ toast.message }}
        </template>

        <template
          v-if="toast.action"
          #action
        >
          {{ toast.action?.label }}
        </template>
      </AppToast>
    </TransitionGroup>
  </div>
</template>

  <style scoped lang="scss">
  .toast-transition-item {
    transition: transform 0.8s cubic-bezier(0.17, 0.67, 0.16, 0.99), 0.3s opacity;
  }

  .toast-transition-to-right-enter-from,
  .toast-transition-to-right-leave-to,
  .toast-transition-to-bottom-enter-from,
  .toast-transition-to-bottom-leave-to {
    opacity: 0;
  }

  .toast-transition-to-bottom-enter-from,
  .toast-transition-to-right-enter-from {
    transform: translateX(60px);
  }

  .toast-transition-to-bottom-leave-to {
    transform: translateY(-30px);
  }
  .toast-transition-to-right-leave-to {
    transform: translateX(400px);
  }

  .toast-transition-to-bottom-leave-active {
    position: absolute;
    width: 100%;
    z-index: 10 !important;
  }
  </style>
