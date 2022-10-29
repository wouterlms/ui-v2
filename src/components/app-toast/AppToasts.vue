<script setup lang="ts">
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

const handleBeforeEnter = (el: HTMLElement): void => {
  const i = +el.getAttribute('data-index')!

  el.style.transform = `translateY(${i * 10 + 10}px) scale(${1 - i / 40 - 0.05})`
}

const handleEnter = (el: HTMLElement): void => {
  const i = +el.getAttribute('data-index')!

  setTimeout(() => {
    el.style.transform = `translateY(${i * 10}px) scale(${1 - i / 40})`
  })
}

const handleLeave = (el: HTMLElement): void => {
  const i = +el.getAttribute('data-index')!
  el.style.transform = `translateY(${i * 10 - 30}px) scale(${1 - i / 40})`
}
</script>

<template>
  <div class="bottom-32 fixed right-20 w-96 z-10">
    <TransitionGroup
      :name="transition"
      @before-enter="handleBeforeEnter"
      @enter="handleEnter"
      @leave="handleLeave"
    >
      <AppToast
        v-for="(toast, i) of toasts"
        :key="toast.id"
        :data-index="i"
        :accent-color="toast.accentColor"
        :icon="toast.icon"
        :style="{
          transform: `translateY(${i * 10}px) scale(${1 - i / 40})`,
          zIndex: toasts.length - i,
        }"
        class="absolute mt-2 toast-transition-item top-0"
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

.toast-transition-to-bottom-leave-active {
  position: absolute;
  width: 100%;
  pointer-events: none;
}
</style>
