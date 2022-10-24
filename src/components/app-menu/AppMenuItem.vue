<script setup lang="ts">
import { MenuItem } from '@headlessui/vue'

export interface Props {
  icon?: string
}

withDefaults(defineProps<Props>(), {
  icon: undefined,
})
</script>

<template>
  <MenuItem v-slot="{ active }">
    <button
      type="button"
      class="p-0.5 text-left w-full"
    >
      <div
        :class="{
          'bg-secondary': active,
        }"
        class="duration-200 flex items-center justify-between p-3.5 rounded-md w-full"
      >
        <span class="mr-4 opacity-90 text-sm text-tertiary truncate">
          <slot />
        </span>

        <slot name="right">
          <AppIcon
            v-if="icon"
            :icon="icon"
            class="flex-shrink-0 h-3 opacity-75 text-tertiary w-3"
          />
        </slot>
      </div>
    </button>
  </MenuItem>
</template>
