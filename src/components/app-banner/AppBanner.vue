<script setup lang="ts">
import AppButton from '../app-button/AppButton.vue'

import { colors } from '@/theme'
import { Icon } from '@/icons'

export interface Props {
  /**
   * Banner title
   */
  title?: string

  /**
   * Banner color
   */
  accentColor?: string

  /**
   * Shows a close button
   */
  isClosable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  accentColor: undefined,
  isClosable: true,
})

const emit = defineEmits<{ (event: 'dismiss'): void }>()

const computedAccentColor = computed(
  () => props.accentColor ?? colors.value.accent.primary,
)

const actionButton = h(AppButton, {
  variant: 'outline',
  colorScheme: 'text-secondary',
  padding: '0.8em 1em',
})
</script>

<template>
  <aside
    :style="{
      backgroundColor: `${computedAccentColor}20`,
      borderColor: computedAccentColor,
    }"
    class="bg-opacity-50 border border-solid p-4 pr-8 relative rounded"
  >
    <AppButton
      v-if="isClosable"
      :icon-left="Icon.GAMING_XMARK"
      variant="unstyled"
      icon-size="0.9em"
      padding="0.5em"
      class="!absolute right-3 top-[1.1em]"
      @click="emit('dismiss')"
    />

    <div class="flex">
      <AppIcon
        :icon="Icon.INDICES_EXCLAMATIONMARK_CIRCLE"
        :style="{
          color: computedAccentColor,
        }"
        class="flex-shrink-0 h-5 translate-y-[1px] w-5"
      />

      <div class="ml-4 text-secondary">
        <div
          v-if="title !== undefined"
          class="font-medium pr-4"
        >
          {{ title }}
        </div>

        <div
          :class="[
            title === undefined ? 'mt-0.5' : 'mt-1',
          ]"
          class="text-sm"
        >
          <slot />
        </div>

        <div
          v-if="$slots.action"
          class="mt-4"
        >
          <slot
            name="action"
            :action-button="actionButton"
          />
        </div>
      </div>
    </div>
  </aside>
</template>
