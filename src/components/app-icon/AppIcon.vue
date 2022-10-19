<script setup lang="ts">
import { icons as themeIcons } from '@/icons'
import { icons as userIcons } from '@/theme'

interface Props {
  /**
   * Icon
   */
  icon: string

  /**
   * Retains inline colors
   */
  preserveOriginalColor?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  preserveOriginalColor: false,
})

const svg = computed(() => ({
  ...themeIcons,
  ...userIcons,
}[props.icon]))

watch(svg, (svgValue) => {
  if (svgValue === undefined)
    throw new Error(`\`${props.icon}\` could not be found`)
}, { immediate: true })

const removeColors = (path: string): string => {
  let pathWithoutHexCodes = path

  const hexColors = path.match(/#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3}/g) || []

  hexColors.forEach((hex) => {
    pathWithoutHexCodes = pathWithoutHexCodes.replace(hex, 'currentColor')
  })

  pathWithoutHexCodes = pathWithoutHexCodes.replaceAll('black', 'currentColor')
  pathWithoutHexCodes = pathWithoutHexCodes.replaceAll('white', 'currentColor')

  return pathWithoutHexCodes
}

const viewBox = computed(() => {
  if (svg.value === undefined)
    return ''

  const wrapper = document.createElement('div')

  wrapper.innerHTML = svg.value

  const viewbox = wrapper.querySelector('svg')?.getAttribute('viewBox')

  return viewbox
})

const paths = computed(() => {
  if (svg.value === undefined)
    return ''

  const wrapper = document.createElement('div')

  wrapper.innerHTML = svg.value

  const svgContent = Array.from(wrapper.children)
    .map((c) => c.innerHTML)
    .join('')

  if (props.preserveOriginalColor)
    return svgContent

  const pathWithoutColors = removeColors(svgContent)

  return pathWithoutColors
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
