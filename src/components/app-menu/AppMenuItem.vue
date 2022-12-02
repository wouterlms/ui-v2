<script setup lang="ts">
import type { Ref } from 'vue'

export interface Props {
  icon?: string
}

withDefaults(defineProps<Props>(), {
  icon: undefined,
})

const menuItem = ref<Ref<HTMLElement> | null>(null)

const activeDescendantId = inject('activeDescendantId') as Ref<string>

const isActive = computed(() => menuItem.value?.id === activeDescendantId.value)
</script>

<template>
  <button
    ref="menuItem"
    type="button"
    class="p-[0.125em] text-left w-full"
    role="menuitem"
    tabindex="-1"
  >
    <div
      :class="{
        'bg-secondary': isActive,
      }"
      class="duration-200 flex items-center justify-between p-[0.875em] rounded-md w-full"
    >
      <span class="mr-[1em] opacity-90 text-[1em] text-sm text-tertiary truncate">
        <slot />
      </span>

      <slot name="right">
        <AppIcon
          v-if="icon"
          :icon="icon"
          class="flex-shrink-0 opacity-75 text-tertiary w-[0.75em]"
        />
      </slot>
    </div>
  </button>
</template>
