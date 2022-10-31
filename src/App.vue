<script setup lang="ts">
import { createTheme } from '@/theme'

createTheme({
  colors: {},
  enableDarkMode: true,
})

const value = ref(null)
</script>

<template>
  <div class="p-16 w-full">
    <FormCheckbox
      v-model="value"
      :value="1"
    />
  </div>
</template>

<style>
body {
  @apply bg-primary;
}
</style>
