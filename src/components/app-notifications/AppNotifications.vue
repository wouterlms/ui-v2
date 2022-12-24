<script setup lang="ts">
import { useNotifications } from '@/composables'

enum Transition {
  TO_RIGHT = 'notification-transition-to-right',
  TO_BOTTOM = 'notification-transition-to-bottom',
}

const {
  notifications,
  removeNotification,
} = useNotifications()

const transition = ref(Transition.TO_BOTTOM)
</script>

<template>
  <div class="bottom-12 fixed right-20 w-96 z-10">
    <TransitionGroup :name="transition">
      <AppNotification
        v-for="notification of notifications"
        :key="notification.id"
        :accent-color="notification.accentColor"
        :icon="notification.icon"
        class="mt-2 notification-transition-item"
        @close="removeNotification(notification)"
        @action="notification.action?.onClick()"
      >
        <template #title>
          {{ notification.title }}
        </template>

        <template #message>
          {{ notification.message }}
        </template>

        <template
          v-if="notification.action"
          #action
        >
          {{ notification.action?.label }}
        </template>
      </AppNotification>
    </TransitionGroup>
  </div>
</template>

  <style scoped lang="scss">
  .notification-transition-item {
    transition: transform 0.8s cubic-bezier(0.17, 0.67, 0.16, 0.99), 0.3s opacity;
  }

  .notification-transition-to-right-enter-from,
  .notification-transition-to-right-leave-to,
  .notification-transition-to-bottom-enter-from,
  .notification-transition-to-bottom-leave-to {
    opacity: 0;
  }

  .notification-transition-to-bottom-enter-from,
  .notification-transition-to-right-enter-from {
    transform: translateX(60px);
  }

  .notification-transition-to-bottom-leave-to {
    transform: translateY(-30px);
  }
  .notification-transition-to-right-leave-to {
    transform: translateX(400px);
  }

  .notification-transition-to-bottom-leave-active {
    position: absolute;
    width: 100%;
    z-index: 10 !important;
  }
  </style>
