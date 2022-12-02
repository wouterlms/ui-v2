<script setup lang="ts">
const value = ref<string | null>(null)
</script>

<template>
  <Story title="FormInput">
    <FormInput v-model="value">
      App Button
    </FormInput>
  </Story>
</template>
