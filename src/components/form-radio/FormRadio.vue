<script setup lang="ts">
import type { Props as BaseProps } from './useFormRadio'
import useFormRadio from './useFormRadio'

import {
  useComponentAttrs,
  useIsKeyboardMode,
} from '@/composables'

import { colors } from '@/theme'

interface Props extends BaseProps {
  error?: boolean
  accentColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  error: false,
  accentColor: undefined,
})

const { radio, state } = useFormRadio()

const computedAccentColor = computed(() => (
  props.accentColor ?? colors.value.accent.primary
))

const isKeyboardMode = useIsKeyboardMode()
const slots = useSlots()

const {
  listenerAttrs,
  nonStylingAttrs,
  stylingAttrs,
} = useComponentAttrs()

const borderColor = computed(() => {
  const { isChecked, isFocused } = state.value

  if (props.error)
    return colors.value.accent.error

  if (isChecked || isFocused)
    return computedAccentColor.value

  return colors.value.border.input
})

const dotColor = computed(() => {
  if (props.error)
    return colors.value.accent.error

  return computedAccentColor.value
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <Component
    v-bind="stylingAttrs"
    :is="slots.default ? 'label' : 'div'"
    class="flex items-center"
  >
    <Component
      v-bind="{
        ...nonStylingAttrs,
        ...listenerAttrs,
      }"
      :is="radio"
      :class="[
        {
          'focus:ring': isKeyboardMode,
          'opacity-50': state.isDisabled,
        },
      ]"
      :style="{
        borderColor,
      }"
      class="bg-primary
        border-[1.5px]
        border-solid
        duration-200
        flex
        flex-shrink-0
        h-[1.125em]
        items-center
        justify-center
        rounded-full
        w-[1.125em]"
    >
      <Transition name="dot-transition">
        <div v-if="state.isChecked">
          <div
            :style="{
              backgroundColor: dotColor,
            }"
            class="h-[0.5em] rounded-full w-[0.5em]"
          />
        </div>
      </Transition>
    </Component>

    <span
      v-if="slots.default"
      :class="[
        error ? 'text-error' : 'text-secondary',
        {
          'opacity-50': state.isDisabled,
        },
      ]"
      class="ml-2"
    >
      <slot />
    </span>
  </Component>
</template>

<style scoped lang="scss">
.dot-transition {
  &-enter-active,
  &-leave-active {
    transition: 0.3s cubic-bezier(0.22, 0.68, 0, 1);
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: scale(0.5);
  }
}
</style>
