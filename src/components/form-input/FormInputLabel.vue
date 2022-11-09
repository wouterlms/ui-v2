<script setup lang="ts">
import { useIsKeyboardMode } from '@/composables'
import { colors } from '@/theme'

export interface Props {
  /**
   * Error
   */
  error: boolean

  /**
   * Disable label + input
   */
  isDisabled: boolean

  /**
   * Whether input is focused
   */
  isFocused: boolean

  /**
   * Border color
   */
  borderColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  borderColor: undefined,
})

const isKeyboardMode = useIsKeyboardMode()

const color = computed(() => {
  if (props.isDisabled)
    return colors.value.text.inputDisabled

  if (props.error)
    return colors.value.accent.error

  return colors.value.text.input
})

const borderColor = computed(() => {
  if (props.error)
    return colors.value.accent.error

  if (props.isFocused)
    return colors.value.accent.primary

  return props.borderColor ?? colors.value.border.input
})

const backgroundColor = computed(() => {
  if (props.isDisabled)
    return colors.value.background.inputDisabled

  return colors.value.background.input
})
</script>

<template>
  <label
    :class="[
      {
        'opacity-50': props.isDisabled,
        'border-error': !!error,
      },
    ]"
    :style="{
      borderColor,
      color,
      backgroundColor,
      outlineColor: isFocused && isKeyboardMode
        ? borderColor
        : 'transparent',
    }"
    class="border border-solid duration-200 flex items-center outline outline-2 outline-offset-2"
  >
    <slot :color="color" />
  </label>
</template>
