import { colors, extendedColors } from './colors'
import { useDarkMode } from '@/composables'
import type { ColorConfig, ColorGroups } from '@/types'

const { isDark } = useDarkMode()

export const camelCaseToKebabCase = (str: string): string => (
  str.split('').map((letter, idx) => (letter.toUpperCase() === letter
    ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
    : letter)).join('')
)

export const setCssVariables = (): void => {
  const root = document.querySelector(':root') as HTMLElement

  if (root == null)
    throw new Error(':root selector not found')

  const index = isDark.value ? 1 : 0

  Object.entries(colors.value).forEach(([
    colorGroup,
    currentColors,
  ]) => {
    const groupMap = {
      accent: 'accent-',
      gray: 'gray-',
      text: 'text-',
      background: 'bg-',
      border: 'border-',
    }

    const prefix = groupMap[colorGroup as keyof typeof groupMap]

    Object.entries(currentColors).forEach(([
      colorKey,
      colorValue,
    ]) => {
      const color = Array.isArray(colorValue) ? colorValue[index] : colorValue

      root.style.setProperty(`--${prefix}${camelCaseToKebabCase(colorKey)}`, color)
    })
  })
}

export const extendColors = (colorConfig: ColorConfig): void => {
  Object.entries(colorConfig).forEach(([
    key,
    values,
  ]) => {
    (extendedColors as any)[key] = {
      ...(extendedColors)[key as ColorGroups],
      ...values,
    }
  })
}
