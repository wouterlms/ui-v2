import { resolve } from 'path'
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import svgTransformer from '@wouterlms/svg-transformer'

import { checker } from 'vite-plugin-checker'

// @ts-expect-error json
import pkg from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // dts({
    //   exclude: [
    //     './src/vite-env.d.ts',
    //     './src/icons.ts',
    //     './auto-imports.d.ts',
    //     './components.d.ts',
    //   ],
    // }),
    Components({
      dirs: ['./src'],
      dts: true,
    }),
    AutoImport({
      imports: ['vue'],
    }),
    checker({
      typescript: true,
    }),
    svgTransformer({
      svgFolderPath: './src/assets/svg',
      outputPath: './src/icons.ts',
      basePath: './src',
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src'),
      },
    ],
  },
  build: {
    lib: {
      name: 'index',
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: Object.keys(pkg.dependencies),
      input: {
        index: resolve(__dirname, 'src/index.ts'),
      },
      output: {
        globals: {
          vue: 'Vue',
          vueRouter: 'VueRouter',
        },
        entryFileNames: () => '[name].[format].js',
      },
    },
  },
  server: {
    port: 3000,
  },
})
