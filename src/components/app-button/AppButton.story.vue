<script setup lang="ts">
import { logEvent } from 'histoire/client'
import { AppButton } from '..'
import type { ButtonVariant, Rounded } from '@/types'

const state = ref({
  content: 'Clickable element',
  isDisabled: false,
  variant: 'solid' as ButtonVariant,
  rounded: 'default' as Rounded,
})

const variants = [
  'solid', 'outline', 'ghost', 'unstyled',
]

const rounded = [
  'none', 'sm', 'default', 'md', 'lg', 'full',
]
</script>

<template>
  <Story title="AppButton">
    <AppButton
      :is-disabled="state.isDisabled"
      :variant="state.variant"
      :rounded="state.rounded"
      @click="(e: any) => logEvent('Click', e)"
    >
      {{ state.content }}
    </AppButton>

    <template #controls>
      <HstText
        v-model="state.content"
        type="text"
        title="Content (default slot)"
      />

      <HstCheckbox
        v-model="state.isDisabled"
        type="checkbox"
        title="is-disabled"
      />

      <HstSelect
        v-model="state.variant"
        :options="variants"
        title="variant"
      />

      <HstSelect
        v-model="state.rounded"
        :options="rounded"
        title="rounded"
      />
    </template>
  </Story>
</template>
