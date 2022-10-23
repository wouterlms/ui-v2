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
}

const props = withDefaults(defineProps<Props>(), {
  position: 'bottom-end',
  rounded: 'default',
})

const menu = ref<InstanceType<typeof Menu> | null>(null)
const menuItems = ref<InstanceType<typeof MenuItems> | null>(null)

const {
  positionX,
  positionY,
  actualPosition,
} = useFloatingUI({
  floatingEl: computed(() => menuItems.value?.$el ?? null),
  referenceEl: computed(() => menu.value?.$el ?? null),
  parentEl: computed(() => menu.value?.$el.parentElement ?? null),
  options: reactive({
    margin: 0,
    offset: 0,
    position: props.position,
  }),
})
</script>

<template>
  <Menu
    ref="menu"
    as="div"
  >
    <MenuButton>
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
        class="absolute bg-primary overflow-hidden shadow-primary w-52"
      >
        <div class="flex flex-col">
          <slot name="menu" />
        </div>
      </MenuItems>
    </Transition>
  </Menu>
</template>
