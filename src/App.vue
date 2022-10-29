<script setup lang="ts">
import { createTheme } from '@/theme'

createTheme({
  colors: {},
  enableDarkMode: true,
})

const show = ref(false)
</script>

<template>
  <div class="p-16 w-full">
    <FormSwitch v-model="show" />
  </div>
</template>

<style>
body {
  @apply bg-primary;
}
</style>
