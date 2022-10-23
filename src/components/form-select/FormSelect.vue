<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue'

import { useVModel } from '@wouterlms/composables'
import FormInput from '../form-input/FormInput.vue'
import { useFloatingUI } from '@/composables'

export interface Props {
  modelValue: unknown
}

const props = withDefaults(defineProps<Props>(), {})

const value = useVModel(toRef(props, 'modelValue'))

const isMultiple = Array.isArray(props.modelValue)

// To fix type error
const computedValue = computed({
  get: () => value.value ?? undefined,
  set: (v) => {
    value.value = v ?? null
  },
})

const formInput = ref<InstanceType<typeof FormInput> | null>(null)
const listbox = ref<InstanceType<typeof Listbox> | null>(null)
const listboxOptions = ref<InstanceType<typeof ListboxOptions> | null>(null)

const {
  positionX,
  positionY,
  actualPosition,
} = useFloatingUI({
  floatingEl: computed(() => listboxOptions.value?.$el ?? null),
  referenceEl: computed(() => listbox.value?.$el ?? null),
  parentEl: computed(() => listbox.value?.$el ?? null),
  options: reactive({
    margin: 0,
    offset: 0,
    position: 'bottom',
  }),
})

onMounted(() => {
  // console.log(listbox.value.$el)
})
</script>

<template>
  <FormInput
    ref="formInput"
    :model-value="null"
  />

  <Listbox
    ref="listbox"
    v-model="computedValue"
    as="div"
    :multiple="isMultiple"
    class="border border-solid"
  >
    <ListboxButton>btn</ListboxButton>

    <ListboxOptions
      ref="listboxOptions"
      :style="{
        position: actualPosition,
        top: `${positionY}px`,
        left: `${positionX}px`,
      }"
      class="absolute bg-primary overflow-hidden shadow-primary w-52"
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
</template>
