<script setup lang="ts">
export interface Props {
  canBeTruncated?: boolean
}

withDefaults(defineProps<Props>(), {
  canBeTruncated: true,
})
</script>

<template>
  <div
    :class="{
      truncate: canBeTruncated,
    }"
    class="leading-5 text-sm"
  >
    <slot />
  </div>
</template>
