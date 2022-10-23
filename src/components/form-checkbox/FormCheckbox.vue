<script setup lang="ts">
import type { Props as BaseProps } from './useFormCheckbox'
import useFormCheckbox from './useFormCheckbox'
import type { Rounded } from '@/types'

import {
  useBorderRadius,
  useColor,
  useComponentAttrs,
  useIsKeyboardMode,
} from '@/composables'

import { colors } from '@/theme'
import { Icon } from '@/icons'

export interface Props extends BaseProps {
  error?: boolean
  accentColor?: string
  backgroundColor?: string
  borderColor?: string

  rounded?: Rounded
}

const props = withDefaults(defineProps<Props>(), {
  error: false,
  rounded: 'sm',
  accentColor: undefined,
  backgroundColor: undefined,
  borderColor: undefined,
})

const { checkbox, state } = useFormCheckbox()

const isKeyboardMode = useIsKeyboardMode()
const slots = useSlots()
const { isDarkColor } = useColor()
const {
  listenerAttrs,
  nonStylingAttrs,
  stylingAttrs,
} = useComponentAttrs()

const computedAccentColor = computed(
  () => props.accentColor ?? colors.value.accent.primary,
)

const computedBackgroundColor = computed(() => {
  if (state.value.isChecked) {
    if (props.error)
      return colors.value.accent.error

    return computedAccentColor.value
  }

  return props.backgroundColor ?? colors.value.background.primary
})

const computedBorderColor = computed(() => {
  if (props.error)
    return colors.value.accent.error

  const { isChecked, isFocused } = state.value

  if (isChecked || isFocused)
    return computedAccentColor.value

  return props.borderColor ?? colors.value.border.input
})

const computedTickColor = computed(() => (isDarkColor(computedBackgroundColor.value) ? '#fff' : '#000'))
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
      :is="checkbox"
      :class="[
        {
          'focus:ring': isKeyboardMode,
          'opacity-50': state.isDisabled,
        },
      ]"
      :style="{
        backgroundColor: computedBackgroundColor,
        borderColor: computedBorderColor,
        borderRadius: useBorderRadius(),
      }"
      class="border-[1.5px]
          border-solid
          duration-200
          flex
          flex-shrink-0
          h-[1.125em]
          items-center
          justify-center
          w-[1.125em]"
    >
      <Transition name="tick-transition">
        <div v-if="state.isChecked">
          <AppIcon
            :icon="Icon.CORE_TICK"
            :style="{
              color: computedTickColor,
            }"
            class="h-[0.6875em] w-[0.6875em]"
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
      <slot
        :is-checked="state.isChecked"
        :is-focused="state.isFocused"
        :is-disabled="state.isDisabled"
        :error="error"
      />
    </span>
  </Component>
</template>

<style scoped lang="scss">
.tick-transition {
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
