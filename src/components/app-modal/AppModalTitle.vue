<script setup lang="ts">
export interface Props {
  isCentered?: boolean
}

withDefaults(defineProps<Props>(), {
  isCentered: true,
})
</script>

<template>
  <h1
    :class="{
      'text-center': isCentered,
    }"
    class="font-bold py-4 text-primary text-xl"
  >
    <slot />
  </h1>
</template>
