export type ColorGroups = 'accent' | 'gray' | 'text' | 'background' | 'border'

export type Color = string | [string, string]

export interface Colors extends Record<ColorGroups, Record<string, Color>> {
  accent: {
    primary: Color
    secondary: Color
    success: Color
    warning: Color
    error: Color
  }
  gray: {
    primary: Color
    secondary: Color
    tertiary: Color
    quaternary: Color
  }
  text: {
    primary: Color
    primaryInverted: Color
    secondary: Color
    tertiary: Color

    input: Color
    inputDisabled: Color
    inputPlaceholder: Color
  }
  background: {
    primary: Color
    primaryInverted: Color
    secondary: Color
    tertiary: Color

    input: Color
    inputDisabled: Color
    switch: Color
    popover: Color
  }
  border: {
    primary: Color
    secondary: Color
    tertiary: Color

    input: Color
  }
}

export type ColorConfig = Partial<{
  [K in keyof Colors]: Partial<Colors[K]> & Record<string, string | [string, string]>
}>

export interface CreateThemeOptions {
  extend: {
    colors?: ColorConfig
    icons?: Record<string, string>
  }
  darkMode?: boolean
}
