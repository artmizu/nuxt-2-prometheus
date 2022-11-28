import type { NuxtConfig } from '@nuxt/types'
import MyModule from '../'

const config: NuxtConfig = {
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    MyModule,
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
}

export default config
