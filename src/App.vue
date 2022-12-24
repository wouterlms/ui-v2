<script setup lang="ts">
import { useToasts } from './composables'
import { createTheme } from '@/theme'

createTheme({
  colors: {},
  enableDarkMode: true,
})

const { showToastMessage } = useToasts()

const add = () => {
  showToastMessage({
    message: 'Project created successfully!',
  })
}
</script>

<template>
  <div class="p-24">
    <AppPopover :container-padding="20">
      <AppButton @click="add">
        Focus Me
      </AppButton>

      <template #popover>
        <div class="max-w-xs p-2 text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio ut nisi molestiae, aut nulla cum.
        </div>
      </template>
    </AppPopover>
  </div>

  <AppToasts />
</template>

<style>
body {
  @apply bg-primary;
}
</style>
