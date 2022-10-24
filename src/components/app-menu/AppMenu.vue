<script setup lang="ts">
import {
  Menu,
  MenuButton,
  MenuItems,
} from '@headlessui/vue'

import type { Placement } from '@floating-ui/dom'

import type { Rounded } from '@/types'
import { useBorderRadius, useFloatingUI } from '@/composables'

export interface Props {
  position?: Placement
  rounded?: Rounded
  margin?: number
  offset?: number
  showArrow?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  position: 'bottom-end',
  rounded: 'default',
  margin: 15,
  offset: 0,
  showArrow: true,
})

const menu = ref<InstanceType<typeof Menu> | null>(null)
const menuItems = ref<InstanceType<typeof MenuItems> | null>(null)
const menuButton = ref<InstanceType<typeof MenuButton> | null>(null)
const arrow = ref<HTMLElement | null>(null)

const {
  positionX,
  positionY,
  arrowPositionX,
  arrowPositionY,
  actualPosition,
} = useFloatingUI({
  floatingEl: computed(() => menuItems.value?.$el ?? null),
  referenceEl: computed(() => menu.value?.$el ?? null),
  parentEl: computed(() => menuButton.value?.$el ?? null),
  arrowEl: computed(() => arrow.value ?? null),
  options: reactive({
    margin: props.margin,
    offset: props.offset,
    position: props.position,
  }),
})
</script>

<template>
  <Menu
    ref="menu"
    as="div"
  >
    <MenuButton
      ref="menuButton"
      class="group"
    >
      <slot />
    </MenuButton>

    <Transition
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      enter-active-class="duration-100 transition-opacity"
      leave-active-class="duration-100 transition-opacity"
    >
      <MenuItems
        ref="menuItems"
        :style="{
          position: actualPosition,
          top: `${positionY}px`,
          left: `${positionX}px`,
          borderRadius: useBorderRadius(),
        }"
        class="absolute bg-primary shadow-primary w-52"
      >
        <div
          v-show="showArrow"
          ref="arrow"
          :style="{
            left: arrowPositionX !== null ? `${arrowPositionX}px` : '',
            top: arrowPositionY !== null ? `${arrowPositionY}px` : '',
            right: '',
            bottom: '',
            [actualPosition]: '-4px',
          }"
          class="absolute bg-primary h-3 rotate-45 rounded-sm shadow-primary w-3"
        />

        <div
          :style="{
            borderRadius: useBorderRadius(),
          }"
          class="bg-primary flex flex-col h-full left-0 overflow-hidden relative top-0 w-full z-[1]"
        >
          <slot name="menu" />
        </div>
      </MenuItems>
    </Transition>
  </Menu>
</template>
