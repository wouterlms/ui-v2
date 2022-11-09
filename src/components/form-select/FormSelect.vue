<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue'

import { useVModel } from '@wouterlms/composables'

import FormInput from '../form-input/FormInput.vue'
import { useComponentAttrs, useFloatingUI } from '@/composables'

export interface Props {
  modelValue: unknown
}

const props = withDefaults(defineProps<Props>(), {})

const value = useVModel(toRef(props, 'modelValue'))

const isMultiple = Array.isArray(props.modelValue)

const { nonStylingAttrs, stylingAttrs, listenerAttrs } = useComponentAttrs()

// To fix type error
const computedValue = computed({
  get: () => value.value ?? undefined,
  set: (v) => {
    value.value = v ?? null
  },
})

const test = ref<HTMLElement | null>(null)
const listbox = ref<InstanceType<typeof Listbox> | null>(null)
const listboxOptions = ref<InstanceType<typeof ListboxOptions> | null>(null)

const {
  width,
  positionX,
  positionY,
  actualPosition,
} = useFloatingUI({
  floatingEl: computed(() => listboxOptions.value?.$el ?? null),
  referenceEl: computed(() => test.value ?? null),
  options: reactive({
    margin: 0,
    offset: 0,
    position: 'bottom',
  }),
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div
    ref="test"
    class="inline-flex"
    v-bind="stylingAttrs"
  >
    <Listbox
      ref="listbox"
      v-model="computedValue"
      as="div"
      :multiple="isMultiple"
    >
      <ListboxButton
        v-bind="{
          ...listenerAttrs,
          ...nonStylingAttrs,
        }"
        :as="FormInput"
        :model-value="computedValue"
        :is-readonly="true"
        class="w-72"
      />

      <ListboxOptions
        ref="listboxOptions"
        :style="{
          position: actualPosition,
          top: `${positionY}px`,
          left: `${positionX}px`,
          width: `${width}px`,
        }"
        class="absolute bg-primary outline-none overflow-hidden shadow-primary"
      >
        <!-- Slot -->

        <ListboxOption :value="1">
          Option A
        </ListboxOption>

        <ListboxOption :value="2">
          Option B
        </ListboxOption>
      </ListboxOptions>
    </Listbox>
  </div>
</template>
