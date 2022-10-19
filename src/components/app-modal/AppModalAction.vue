<script setup lang="ts">
import AppButton from '../app-button/AppButton.vue'
import { ButtonVariant, Rounded } from '@/enums'

interface Props {
  isSecondaryAction?: boolean
}

withDefaults(defineProps<Props>(), {
  isSecondaryAction: false,
})
</script>

<template>
  <AppButton
    v-if="isSecondaryAction"
    :variant="ButtonVariant.GHOST"
    :rounded="Rounded.MD"
    class="!block hover:underline mx-auto w-full"
  >
    <slot />
  </AppButton>

  <AppButton
    v-else
    :rounded="Rounded.MD"
    class="w-full"
  >
    <slot />
  </AppButton>
</template>
