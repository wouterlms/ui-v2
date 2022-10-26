import { watchEffect } from 'vue'

import type { ColorConfig } from '../types'
import { extendColors, setCssVariables } from './utils'

import { useDarkMode } from '@/composables'

interface Options {
  enableDarkMode: boolean
  colors: ColorConfig
}

const { detectTheme } = useDarkMode()

export default ({ enableDarkMode, colors }: Options): void => {
  if (enableDarkMode)
    detectTheme()

  extendColors(colors)

  watchEffect(() => {
    setCssVariables()
  })
}
