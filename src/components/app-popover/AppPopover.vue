<script setup lang="ts">
import type { Placement } from '@floating-ui/dom'

import {
  Popover,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/vue'

import type { Rounded } from '@/types'

import { useBorderRadius, useFloatingUI } from '@/composables'
import { colors } from '@/theme'

export interface Props {
  position?: Placement
  margin?: number
  offset?: number
  containerPadding?: number
  inheritWidth?: boolean
  showArrow?: boolean
  container?: HTMLElement

  rounded?: Rounded
  backgroundColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  position: 'bottom',
  margin: 0,
  offset: 0,
  containerPadding: 0,
  inheritWidth: false,
  showArrow: true,
  container: undefined,

  rounded: 'default',
  backgroundColor: undefined,
})

const popover = ref<InstanceType<typeof Popover> | null>(null)
const popoverPanel = ref<InstanceType<typeof PopoverPanel> | null>(null)
const arrow = ref<HTMLElement | null>(null)

const {
  positionX,
  positionY,
  arrowPositionX,
  arrowPositionY,
  actualPosition,
  width,
} = useFloatingUI({
  floatingEl: computed(() => popoverPanel.value?.$el ?? null),
  referenceEl: computed(() => popover.value?.$el ?? null),
  parentEl: computed(() => popover.value?.$el.parentElement ?? null),
  arrowEl: computed(() => arrow.value ?? null),
  options: reactive({
    margin: props.margin,
    offset: props.offset,
    position: props.position,
    container: props.container,
    containerPadding: props.containerPadding,
  }),
})

const computedBackgroundColor = computed(() => (
  props.backgroundColor ?? colors.value.background.popover
))
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <Popover
    v-slot="{ close }"
    ref="popover"
  >
    <PopoverButton>
      <slot :close="close" />
    </PopoverButton>

    <Transition
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      enter-active-class="duration-100 transition-opacity"
      leave-active-class="duration-100 transition-opacity"
    >
      <PopoverPanel
        v-bind="$attrs"
        ref="popoverPanel"
        :style="{
          position: actualPosition,
          top: `${positionY}px`,
          left: `${positionX}px`,
          width: inheritWidth ? `${width}px` : undefined,
          backgroundColor: computedBackgroundColor,
          borderRadius: useBorderRadius(),
        }"
        class="absolute shadow-primary"
      >
        <div
          v-show="showArrow"
          ref="arrow"
          :style="{
            backgroundColor: computedBackgroundColor,
            left: arrowPositionX !== null ? `${arrowPositionX}px` : '',
            top: arrowPositionY !== null ? `${arrowPositionY}px` : '',
            right: '',
            bottom: '',
            [actualPosition]: '-4px',
          }"
          class="absolute h-3 rotate-45 rounded-sm shadow-primary w-3"
        />

        <div
          :style="{
            backgroundColor: computedBackgroundColor,
            borderRadius: useBorderRadius(),
          }"
          class="h-full left-0 overflow-hidden relative top-0 w-full z-[1]"
        >
          <slot
            name="popover"
            :close="close"
          />
        </div>
      </PopoverPanel>
    </Transition>
  </Popover>
</template>
