import { watchEffect } from 'vue'

import type { ColorConfig } from '../types'
import { extendColors, setCssVariables } from './utils'

import { icons } from './icons'
import { useDarkMode } from '@/composables'

interface Options {
  enableDarkMode: boolean
  icons: Record<string, string>
  colors: ColorConfig
}

const { detectTheme } = useDarkMode()

export default ({ enableDarkMode, colors, icons: _icons }: Options): void => {
  if (enableDarkMode)
    detectTheme()

  Object.entries(_icons).forEach(([
    key,
    value,
  ]) => {
    icons[key] = value
  })

  extendColors(colors)

  watchEffect(() => {
    setCssVariables()
  })
}
