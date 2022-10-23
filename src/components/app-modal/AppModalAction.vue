<script setup lang="ts">
export interface Props {
  isSecondaryAction?: boolean
}

withDefaults(defineProps<Props>(), {
  isSecondaryAction: false,
})
</script>

<template>
  <AppButton
    v-if="isSecondaryAction"
    rounded="md"
    variant="ghost"
    class="!block hover:underline mx-auto w-full"
  >
    <slot />
  </AppButton>

  <AppButton
    v-else
    rounded="md"
    class="w-full"
  >
    <slot />
  </AppButton>
</template>
