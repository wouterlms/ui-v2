<script setup lang="ts">
import AppIcon from '../app-icon/AppIcon.vue'
import AppButton from '../app-button/AppButton.vue'
import AppFocusable from '../app-focusable/AppFocusable.vue'

import { Icon } from '@/icons'
import { colors } from '@/theme'
import { ButtonVariant } from '@/enums'

interface Props {
  accentColor?: string
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  accentColor: undefined,
  icon: undefined,
})

const emit = defineEmits<{
  (event: 'close'): void
  (event: 'action'): void
}>()

const computedAccentColor = computed(() => props.accentColor ?? colors.value.accent.primary)
const computedIcon = computed(() => props.icon ?? Icon.CORE_TICK_FILLED)
</script>

<template>
  <aside
    class="bg-input
    dark:shadow-none
    flex
    gap-x-4
    overflow-hidden
    p-4
    relative
    rounded-md
    shadow-primary
    w-96"
  >
    <div
      :style="{
        backgroundColor: computedAccentColor,
      }"
      class="absolute h-full left-0 top-0 w-[3px]"
    />

    <div class="flex-shrink-0 pl-1">
      <AppIcon
        :icon="computedIcon"
        :style="{
          color: computedAccentColor,
        }"
        class="h-4 mt-1 w-4"
      />
    </div>

    <div class="w-full">
      <div class="flex items-center justify-between">
        <h1 class="font-medium text-secondary">
          <slot name="title" />
        </h1>

        <AppButton
          :icon-left="Icon.CORE_CLOSE_BOLD"
          :variant="ButtonVariant.GHOST"
          :accent-color="colors.text.tertiary"
          padding="0.3em"
          icon-size="0.5em"
          @click="emit('close')"
        />
      </div>

      <p class="mt-0.5 text-secondary text-sm">
        <slot name="message" />
      </p>

      <div
        v-if="$slots.action"
        class="mt-1"
      >
        <AppFocusable
          :style="{
            color: computedAccentColor,
          }"
          class="text-sm underline"
          @click="emit('action')"
        >
          <slot name="action" />
        </AppFocusable>
      </div>
    </div>
  </aside>
</template>
