<script setup lang="ts">
import { createTheme } from '@/theme'

createTheme({
  colors: {},
  icons: {},
  enableDarkMode: true,
})

const value = ref(null)
</script>

<template>
  {{ value }}
  <div class="p-64 w-full">
    <div>
      <FormSelect v-model="value">
        FormSelect
      </FormSelect>
    </div>
  </div>
</template>

<style>
body {
  @apply bg-primary;
}
</style>
