import path from 'path'
import type { Module } from '@nuxt/types'

const module: Module = function () {
  // eslint-disable-next-line no-console
  console.log('module init')
  // eslint-disable-next-line no-console
  console.log(path.resolve(__dirname, './runtime/plugin.mjs'))
  this.addPlugin(path.resolve(__dirname, './runtime/plugin.mjs'))
}

export default module
