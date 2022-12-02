<script setup lang="ts">
import { useEventListener } from '@wouterlms/composables'
import type { Placement } from '@floating-ui/dom'

import {
  useBorderRadius,
  useFloatingUI,
  useIsKeyboardMode,
} from '@/composables'

import { clickOutside as vClickOutside } from '@/directives'

import type { Rounded } from '@/types'

export interface Props {
  position?: Placement
  rounded?: Rounded
  margin?: number
  offset?: number
  showArrow?: boolean
  container?: HTMLElement
  backgroundColor?: string
  containerPadding?: number
  inheritWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  position: 'bottom-end',
  rounded: 'default',
  margin: 15,
  offset: 0,
  showArrow: true,
  container: undefined,
  backgroundColor: undefined,
  containerPadding: 0,
  inheritWidth: false,
})

const isMenuVisible = ref(false)

const container = ref<HTMLElement | null>(null)
const button = ref<HTMLElement | null>(null)
const menu = ref<HTMLElement | null>(null)
const arrow = ref<HTMLElement | null>(null)
const menuScrollContainer = ref<HTMLElement | null>(null)

let menuObserver: MutationObserver | null = null

const activeDescendantId = ref<string | null>(null)
const menuItems = ref<HTMLButtonElement[]>([])

const isKeyboardMode = useIsKeyboardMode()

const {
  positionX,
  positionY,
  arrowPositionX,
  arrowPositionY,
  actualPosition,
  width,
} = useFloatingUI({
  isFloatingElementVisible: computed(() => isMenuVisible.value),
  floatingEl: computed(() => menu.value ?? null),
  referenceEl: computed(() => button.value ?? null),
  arrowEl: computed(() => arrow.value ?? null),
  options: reactive({
    margin: props.margin,
    offset: props.offset,
    position: props.position,
    container: props.container,
    containerPadding: props.containerPadding,
  }),
})

const closeAndFocusButton = (): void => {
  if (isMenuVisible.value) {
    isMenuVisible.value = false
    button.value?.focus()
  }
}

const scrollToMenuItem = (menuItem: HTMLElement): void => {
  const currentScrollPosition = menuScrollContainer.value?.scrollTop ?? 0
  const containerHeight = menuScrollContainer.value?.clientHeight ?? 0

  if (
    menuItem.offsetTop > currentScrollPosition + containerHeight - menuItem.clientHeight
    || menuItem.offsetTop < currentScrollPosition
  )
    menuScrollContainer.value?.scrollTo(0, menuItem.offsetTop)
}

const selectMenuItem = (index: number): void => {
  const menuItem = menuItems.value[index] ?? null

  if (menuItem !== null) {
    activeDescendantId.value = menuItem.id
    scrollToMenuItem(menuItem)
  }
}

const handleKeyDown = (event: KeyboardEvent): void => {
  if (!isMenuVisible.value)
    return

  const index = menuItems.value.findIndex(
    (menuItem) => menuItem.id === activeDescendantId.value,
  )

  const activeMenuItem = menuItems.value.find(
    (menuItem) => menuItem.id === activeDescendantId.value,
  )

  switch (event.key) {
    case 'ArrowUp':
      selectMenuItem(index - 1)
      event.preventDefault()

      break
    case 'ArrowDown':
      selectMenuItem(index + 1)
      event.preventDefault()

      break
    case 'Escape':
      closeAndFocusButton()

      break
    case ' ':
    case 'Enter':
      activeMenuItem?.click()
      event.preventDefault()
      closeAndFocusButton()

      break
    default:
      break
  }
}

useEventListener('keydown', handleKeyDown)

useEventListener(document, 'focusin', () => {
  if (!isMenuVisible.value)
    return

  const activeElement = document.activeElement as HTMLElement | null
  const isFocusInMenu = menu.value!.contains(activeElement) || activeElement === button.value

  if (activeElement !== menu.value && !isFocusInMenu)
    isMenuVisible.value = false
})

const setMenuItems = (): void => {
  menuItems.value = Array.from(menu.value!.querySelectorAll('button'))

  menuItems.value.forEach((menuItem, i) => {
    menuItem.setAttribute('id', `menu-item-${i}`)
    menuItem.addEventListener('click', () => closeAndFocusButton())
  })

  if (isKeyboardMode.value)
    selectMenuItem(0)
}

const createMenuObserver = (): void => {
  menuObserver = new MutationObserver(() => {
    setMenuItems()
  })

  setMenuItems()

  menuObserver.observe(menu.value as HTMLElement, {
    childList: true,
    subtree: true,
  })
}

watch(isMenuVisible, async (isMenuVisible) => {
  if (isMenuVisible) {
    await nextTick()
    createMenuObserver()

    setTimeout(() => {
      menu.value?.focus()
    }, 0)
  }
  else {
    menuObserver?.disconnect()
    activeDescendantId.value = null
  }
})

onMounted(() => {
  const children = container.value?.children ?? []

  if (children.length !== 1)
    throw new Error('<AppMenu> must have exactly one element in <slot>')

  button.value = children[0] as HTMLElement

  button.value.addEventListener('click', () => {
    isMenuVisible.value = !isMenuVisible.value
  })
})

provide('activeDescendantId', activeDescendantId)
</script>

<template>
  <div ref="container">
    <slot />

    <div
      v-if="isMenuVisible"
      ref="menu"
      v-click-outside="() => isMenuVisible = false"
      :aria-activedescendant="activeDescendantId ?? undefined"
      :style="{
        [actualPosition]: 'auto',
        top: `${positionY}px`,
        left: `${positionX}px`,
        width: inheritWidth ? `${width}px` : undefined,
        borderRadius: useBorderRadius(),
      }"
      role="menu"
      tabindex="0"
      class="absolute bg-primary flex flex-col outline-none shadow-primary"
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
        ref="menuScrollContainer"
        :style="{
          borderRadius: useBorderRadius(),
        }"
        class="bg-primary
          flex
          flex-col
          h-full
          left-0
          max-h-[20rem]
          overflow-hidden
          overflow-y-auto
          relative
          top-0
          w-full
          z-[1]"
      >
        <slot name="menu" />
      </div>
    </div>
  </div>
</template>
