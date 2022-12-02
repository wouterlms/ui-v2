<script setup lang="ts">
import type { Ref } from 'vue'

export interface Props {
  value: unknown
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  icon: undefined,
})

const listboxOption = ref<Ref<HTMLElement> | null>(null)

const activeDescendantId = inject('activeDescendantId') as Ref<string>
const options = inject('options') as Ref<any[]>

const isActive = computed(() => listboxOption.value?.id === activeDescendantId.value)

// onMounted(() => {
//   options.value.push(props.value)
// })

// onBeforeUnmount(() => {
//   options.value = options.value.filter((option) => option !== props.value)
// })

const handleClick = (): void => {
  console.log('@click')
}
</script>

<template>
  <li
    ref="listboxOption"
    :aria-selected="isActive"
    :data-value="JSON.stringify(value)"
    tabindex="-1"
    role="option"
    class="cursor-pointer p-0.5 text-left w-full"
    @click="handleClick"
  >
    <div
      :class="{
        'bg-secondary': isActive,
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
          class="flex-shrink-0 opacity-75 text-tertiary w-3"
        />
      </slot>
    </div>
  </li>
</template>
