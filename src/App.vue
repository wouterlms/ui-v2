<script setup lang="ts">
import { createTheme } from '@/theme'

createTheme({
  colors: {},
  enableDarkMode: true,
})

const showModal = ref(false)

const showExtra = ref(false)

setTimeout(() => {
  showExtra.value = true
}, 2000)

const handleClick = (): void => {
  console.log('click')
}

const value = ref(null)
</script>

<template>
  <div class="p-24">
    <div class="h-screen" />
    <!--
      <AppPopover :inherit-width="true">
      <AppFocusable>Focus Me</AppFocusable>

      <template #popover="{ close }">
      <div class="flex flex-col p-2">
      <a href="##" @click="close">Item 1</a>
      <a href="##">Item 2</a>
      <a href="##">Item 3</a>
      </div>
      </template>
      </AppPopover>
    -->

    {{ value }}

    <FormSelect v-model="value">
      <FormSelectOption :value="{ userName: 'Wouter' }">
        Option A
      </FormSelectOption>

      <FormSelectOption :value="{ userName: 'Wouter qkjdqlksjq' }">
        Option B
      </FormSelectOption>

      <FormSelectOption :value="{ userName: 'Wouter qlskdjqksdqksjqs' }">
        Option C
      </FormSelectOption>
    </FormSelect>

    <AppMenu :inherit-width="true">
      <AppFocusable class="w-52">
        Focus Me
      </AppFocusable>

      <template #menu>
        <div class="w-80">
          <AppMenuItem
            @click="handleClick"
          >
            Item 1
          </AppMenuItem>
          <AppMenuItem>Item 2</AppMenuItem>
          <AppMenuItem>Item 3</AppMenuItem>

          <AppMenuItem>Item 4</AppMenuItem>

          <AppMenuDivider />

          <AppMenuItem>Item 5</AppMenuItem>
          <AppMenuItem>Item 6</AppMenuItem>

          qdkjqkljqsjlkqskjlqs

          <AppMenuItem>Item 7</AppMenuItem>
          <AppMenuItem>Item 8</AppMenuItem>

          <AppMenuItem>Item 9</AppMenuItem>
          <AppMenuItem>Item 10</AppMenuItem>
        </div>
      </template>
    </AppMenu>

    <AppFocusable>Should close when this is focused</AppFocusable>

    <div class="h-screen" />
  </div>
</template>

<style>
body {
  @apply bg-primary;
}
</style>
