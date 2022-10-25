<script setup lang="ts">
import type { Props as BaseProps } from './useFormInput'

import useFormInput from './useFormInput'
import type { Rounded } from '@/types'

import {
  useBorderRadius,
  useComponentAttrs,
} from '@/composables'

import { colors } from '@/theme'
import { Icon } from '@/icons'

export interface Props extends BaseProps {
  /**
   * Input error
   */
  error?: boolean

  /**
   * Left icon
   */
  iconLeft?: string

  /**
   * Right icon
   */
  iconRight?: string

  /**
   * Icon left size
   */
  iconLeftSize?: string

  /**
   * Icon right size
   */
  iconRightSize?: string

  /**
   * Border color
   */
  borderColor?: string

  /**
   * Input padding
   */
  padding?: string

  /**
   * Border radius
   */
  rounded?: Rounded
}

const props = withDefaults(defineProps<Props>(), {
  error: false,
  iconLeft: undefined,
  iconRight: undefined,
  iconLeftSize: '0.9375em',
  iconRightSize: '0.9375em',
  borderColor: undefined,

  padding: '0.5em',
  rounded: 'default',
})

const {
  input,
  state,
  togglePassword,
} = useFormInput()

const {
  listenerAttrs,
  nonStylingAttrs,
  stylingAttrs,
} = useComponentAttrs()

const computedBorderColor = computed(
  () => props.borderColor ?? colors.value.border.input,
)

const iconColor = computed(() => {
  if (props.error)
    return colors.value.accent.error

  return colors.value.text.tertiary
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <FormInputLabel
    v-slot="{ color }"
    v-bind="stylingAttrs"
    :error="!!error"
    :is-disabled="state.isDisabled"
    :is-focused="state.isFocused"
    :border-color="computedBorderColor"
    :style="{
      borderRadius: useBorderRadius(),
    }"
  >
    <AppIcon
      v-if="iconLeft"
      :icon="iconLeft"
      :style="{
        width: iconLeftSize,
        height: iconLeftSize,
        color: iconColor,
      }"
      class="flex-shrink-0 ml-[0.625em]"
    />

    <slot name="left" />

    <slot
      v-if="$slots.input"
      name="input"
    />

    <Component
      v-bind="{
        ...listenerAttrs,
        ...nonStylingAttrs,
        type: state.isPasswordVisible ? 'text' : state.type,
      }"
      :is="input"
      :class="{
        'absolute opacity-0 pointer-events-none': $slots.input,
      }"
      :style="{
        padding,
      }"
      class="w-full"
    />

    <slot name="right" />

    <AppLoader
      v-if="state.isLoading"
      :accent-color="colors.text.input"
      class="mr-[1em] text-[0.625em]"
    />

    <AppIcon
      v-else-if="iconRight"
      :icon="iconRight"
      :style="{
        width: iconRightSize,
        height: iconRightSize,
        color: iconColor,
      }"
      class="flex-shrink-0 mr-[0.625em]"
    />

    <AppButton
      v-else-if="state.type === 'password'"
      :icon-left="state.isPasswordVisible
        ? Icon.HUMAN_EYE
        : Icon.HUMAN_EYE_SLASH"
      :is-disabled="state.isDisabled || state.isReadonly"
      :accent-color="color"
      rounded="sm"
      variant="ghost"
      padding="0.2em"
      class="mr-[0.5em]"
      @click="togglePassword"
    />
  </FormInputLabel>
</template>

<style scoped lang="scss">
:deep input,
:deep textarea {
  &::placeholder {
    @apply text-input-placeholder text-[0.875em];
    // @apply text-[0.875em] text-input-placeholder font-light;
  }
}
</style>
