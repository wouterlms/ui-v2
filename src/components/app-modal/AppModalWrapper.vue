<script setup lang="ts">
import { FocusTrap } from 'focus-trap-vue'

export interface Props {
  active: boolean
}

withDefaults(defineProps<Props>(), {})
</script>

<template>
  <Teleport to="body">
    <FocusTrap :active="active">
      <div>
        <slot />
      </div>
    </FocusTrap>
  </Teleport>
</template>
