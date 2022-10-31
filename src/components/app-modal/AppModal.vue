<script setup lang="ts">
import { useIsMobileDevice } from '@wouterlms/composables'
import { Icon } from '@wouterlms/icons'

import AppModalOverlay from './AppModalOverlay.vue'

import type { Props as BaseProps } from './useAppModal'
import useAppModal from './useAppModal'
import type { Rounded } from '@/types'

import { useBorderRadius } from '@/composables'

export interface Props extends BaseProps {
  /**
   * Show close button in top right corner
   */
  showCloseButton?: boolean

  /**
   * Close when clicking outside of the modal
   */
  closeOnClickOutside?: boolean

  /**
   * Blur background when modal is visible
   */
  blur?: boolean

  /**
   * Border radius
   */
  rounded?: Rounded
}

const props = withDefaults(defineProps<Props>(), {
  showCloseButton: true,
  closeOnClickOutside: true,
  blur: false,
  rounded: 'default',
})

const {
  modalWrapper,
  state,
  close,
} = useAppModal()

const isMobileDevice = useIsMobileDevice()

const handleOverlayClicked = (): void => {
  if (props.closeOnClickOutside)
    close()
}
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <Component :is="modalWrapper">
    <Transition :name="isMobileDevice ? 'mobile-transition' : 'pc-transition'">
      <div
        v-if="state.isVisible"
        v-bind="$attrs"
        :style="{
          borderRadius: useBorderRadius(),
        }"
        class="-translate-x-1/2
        -translate-y-1/2
        bg-primary
        fixed
        flex
        flex-col
        justify-between
        left-1/2
        overflow-hidden
        top-1/2
        z-20"
      >
        <AppFocusable
          v-if="showCloseButton"
          class="absolute bg-gray-secondary p-1 right-3 rounded-full top-3"
          @click="close"
        >
          <AppIcon
            :icon="Icon.GAMING_XMARK"
            class="text-secondary w-3"
          />
        </AppFocusable>

        <slot :close="close" />
      </div>
    </Transition>

    <Transition name="overlay-transition">
      <Component
        :is="AppModalOverlay"
        v-if="state.isVisible"
        :class="{
          'backdrop-filter backdrop-blur-sm': blur,
        }"
        class="z-10"
        @click="handleOverlayClicked"
      />
    </Transition>
  </Component>
</template>

<style scoped lang="scss">
.overlay-transition {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.3s cubic-bezier(0.17, 0.67, 0.16, 0.99);
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}

.pc-transition {
  &-enter-active,
  &-leave-active {
    transition: 0.3s cubic-bezier(0.22, 0.68, 0, 1.51);
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.1) !important;
  }
}

.mobile-transition {
  &-enter-active,
  &-leave-active {
    transition: 0.3s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translate(-50%, -20%) !important;
  }
}
</style>
