<script setup lang="ts">
export interface Props {
  as?: string | Object
}

withDefaults(defineProps<Props>(), {
  as: 'button',
})
</script>

<template>
  <Component
    :is="as"
    type="button"
    class="duration-200 outline-offset-[3px] rounded"
  >
    <slot />
  </Component>
</template>
