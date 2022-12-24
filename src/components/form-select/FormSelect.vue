<script setup lang="ts">
import { useEventListener, useVModel } from '@wouterlms/composables'
import type { Placement } from '@floating-ui/dom'

import AppFocusable from '../app-focusable/AppFocusable.vue'

import type { Rounded } from '../../types'
import { useBorderRadius, useFloatingUI } from '@/composables'

import { clickOutside as vClickOutside } from '@/directives'

export interface Props {
  modelValue: unknown
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

const value = useVModel(toRef(props, 'modelValue'))

const isDropdownVisible = ref(false)

const container = ref<HTMLElement | null>(null)
const button = ref<InstanceType<typeof AppFocusable> | null>(null)
const listbox = ref<HTMLElement | null>(null)
const arrow = ref<HTMLElement | null>(null)
const listboxScrollContainer = ref<HTMLElement | null>(null)

let listboxObserver: MutationObserver | null = null

const activeDescendantId = ref<string | null>(null)
const listboxOptions = ref<HTMLLIElement[]>([])

const options = ref<any>([])

const {
  positionX,
  positionY,
  arrowPositionX,
  arrowPositionY,
  actualPosition,
  width,
} = useFloatingUI({
  isFloatingElementVisible: computed(() => isDropdownVisible.value),
  floatingEl: computed(() => listbox.value ?? null),
  referenceEl: computed(() => button.value?.$el ?? null),
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
  isDropdownVisible.value = false
  button.value?.$el.focus()
}

const scrollToListboxOption = (menuItem: HTMLElement): void => {
  const currentScrollPosition = listboxScrollContainer.value?.scrollTop ?? 0
  const containerHeight = listboxScrollContainer.value?.clientHeight ?? 0

  if (
    menuItem.offsetTop > currentScrollPosition + containerHeight - menuItem.clientHeight
    || menuItem.offsetTop < currentScrollPosition
  )
    listboxScrollContainer.value?.scrollTo(0, menuItem.offsetTop)
}

const selectListboxOption = (index: number): void => {
  const listboxOption = listboxOptions.value[index] ?? null

  if (listboxOption !== null) {
    activeDescendantId.value = listboxOption.id
    scrollToListboxOption(listboxOption)
  }
}

const handleKeyDown = (event: KeyboardEvent): void => {
  if (!isDropdownVisible.value)
    return

  const index = listboxOptions.value.findIndex(
    (listboxOption) => listboxOption.id === activeDescendantId.value,
  )

  const activeListboxOption = listboxOptions.value.find(
    (listboxOption) => listboxOption.id === activeDescendantId.value,
  )

  switch (event.key) {
    case 'ArrowUp':
      selectListboxOption(index - 1)
      event.preventDefault()

      break
    case 'ArrowDown':
      selectListboxOption(index + 1)
      event.preventDefault()

      break
    case 'Escape':
      closeAndFocusButton()

      break
    case ' ':
    case 'Enter':
      if (activeListboxOption != null) {
        activeListboxOption.click()
        const newValue = JSON.parse(activeListboxOption?.getAttribute('data-value') as string)

        value.value = newValue
      }

      event.preventDefault()
      closeAndFocusButton()

      break
    default:
      break
  }
}

useEventListener('keydown', handleKeyDown)

useEventListener(document, 'focusin', () => {
  if (!isDropdownVisible.value)
    return

  const activeElement = document.activeElement as HTMLElement | null

  if (activeElement !== listbox.value)
    isDropdownVisible.value = false
})

const setListboxOptions = (): void => {
  listboxOptions.value = Array.from(listbox.value!.querySelectorAll('li'))

  listboxOptions.value.forEach((menuItem, i) => {
    menuItem.setAttribute('id', `menu-item-${i}`)
  })

  selectListboxOption(0)
}

const createListboxObserver = (): void => {
  listboxObserver = new MutationObserver(() => {
    setListboxOptions()
  })

  setListboxOptions()

  listboxObserver.observe(listbox.value as HTMLElement, {
    childList: true,
    subtree: true,
  })
}

watch(isDropdownVisible, async (isDropdownVisible) => {
  if (isDropdownVisible) {
    await nextTick()
    createListboxObserver()

    setTimeout(() => {
      listbox.value?.focus()
    }, 0)
  }
  else {
    listboxObserver?.disconnect()
    activeDescendantId.value = null
  }
})

provide('activeDescendantId', activeDescendantId)
provide('options', options)
</script>

<template>
  <div ref="container">
    <AppFocusable
      ref="button"
      :aria-expanded="isDropdownVisible.toString()"
      :aria-haspopup="true"
      @click="isDropdownVisible = !isDropdownVisible"
    >
      Focus me
    </AppFocusable>

    <ul
      v-if="isDropdownVisible"
      ref="listbox"
      v-click-outside="() => isDropdownVisible = false"
      :aria-activedescendant="activeDescendantId ?? undefined"
      :style="{
        [actualPosition]: 'auto',
        top: `${positionY}px`,
        left: `${positionX}px`,
        width: inheritWidth ? `${width}px` : undefined,
        borderRadius: useBorderRadius(),
      }"
      role="listbox"
      aria-orientation="vertical"
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
        role="none"
        class="absolute bg-primary h-3 rotate-45 rounded-sm shadow-primary w-3"
      />

      <div
        ref="listboxScrollContainer"
        :style="{
          borderRadius: useBorderRadius(),
        }"
        role="none"
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
        <slot />
      </div>
    </ul>
  </div>
</template>
