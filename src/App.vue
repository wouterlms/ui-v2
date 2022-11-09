<script setup lang="ts">
import { createTheme } from '@/theme'

createTheme({
  colors: {},
  enableDarkMode: true,
})

const value = ref(null)
const showModal = ref(false)
</script>

<template>
  <div>
    <AppButton @click="showModal = true">
      Toggle
    </AppButton>

    <AppModal
      v-model:show="showModal"
      class="p-8 w-[90vw]"
    >
      <AppModalContent>
        <div class="h-[150vh]" />
        <FormInput :model-value="null" />
      </AppModalContent>
    </AppModal>
  </div>
</template>

<style>
body {
  @apply bg-primary;
}
</style>
