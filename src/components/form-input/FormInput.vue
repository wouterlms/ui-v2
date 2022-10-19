<script setup lang="ts">
import AppButton from '../app-button/AppButton.vue'
import AppIcon from '../app-icon/AppIcon.vue'
import AppLoader from '../app-loader/AppLoader.vue'
import FormInputLabel from './FormInputLabel.vue'

import type { Props as BaseProps } from './useFormInput'

import useFormInput from './useFormInput'

import {
  useBorderRadius,
  useComponentAttrs,
} from '@/composables'

import { ButtonVariant, Rounded } from '@/enums'
import { colors } from '@/theme'
import { Icon } from '@/icons'

interface Props extends BaseProps {
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
  rounded: Rounded.DEFAULT,
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
      :variant="ButtonVariant.GHOST"
      :icon-left="state.isPasswordVisible
        ? Icon.CORE_EYE_HIDE
        : Icon.CORE_EYE_VIEW"
      :is-disabled="state.isDisabled || state.isReadonly"
      :accent-color="color"
      :rounded="Rounded.SM"
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