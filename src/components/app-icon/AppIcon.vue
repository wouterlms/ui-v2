<script setup lang="ts">
export interface Props {
  /**
   * Icon
   */
  icon: string

  /**
   * Retains inline colors
   */
  preserveOriginalColor?: boolean

  /**
   * Secondary color
   */
  secondaryColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  preserveOriginalColor: false,
  secondaryColor: 'transparent',
})

const removeHexColors = (path: string): string => {
  let pathWithoutHexCodes = path

  const hexColors = path.match(/#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3}/g) || []

  hexColors.forEach((hex) => {
    pathWithoutHexCodes = pathWithoutHexCodes.replace(hex, 'currentColor')
  })

  return pathWithoutHexCodes
}

const viewBox = computed(() => {
  if (props.icon === undefined)
    return ''

  const wrapper = document.createElement('div')

  wrapper.innerHTML = props.icon

  const viewbox = wrapper.querySelector('svg')?.getAttribute('viewBox')

  return viewbox
})

const paths = computed(() => {
  const wrapper = document.createElement('div')

  wrapper.innerHTML = props.icon

  const svgContent = Array.from(wrapper.children)
    .map((c) => c.innerHTML)
    .join('')

  if (props.preserveOriginalColor)
    return svgContent

  let pathWithoutHexColors = removeHexColors(svgContent)

  pathWithoutHexColors = pathWithoutHexColors
    .replaceAll('black', 'currentColor')
    .replaceAll('white', props.secondaryColor)

  return pathWithoutHexColors
})
</script>

<template>
  <svg
    :viewBox="viewBox ?? undefined"
    class="fill-current"
    preserveAspectRatio="xMinYMin meet"
    width="100%"
    height="100%"
    v-html="paths"
  />
</template>
