import { resolve } from 'path'
import type { Context, Module } from '@nuxt/types'
import merge from 'lodash.merge'
import consola from 'consola'
import type { AnalyticsModuleParams, AnalyticsModuleState } from './type'
import { renderTime, requestTime, totalTime } from './registry'
import { calculateTime } from './utils'

const module: Module<AnalyticsModuleParams> = function (moduleOptions) {
  const option = merge(
    {
      verbose: true,
    },
    this.options.analytics,
    moduleOptions,
  )

  this.addServerMiddleware({
    path: '/metrics',
    handler: resolve(__dirname, './runtime/handler.js'),
  })

  this.addServerMiddleware({
    path: '/health',
    handler: resolve(__dirname, './runtime/health.js'),
  })

  this.addPlugin({ src: resolve(__dirname, './runtime/plugin.js'), mode: 'server', options: option })

  this.nuxt.hook('render:route', (_: unknown, __: unknown, context: Context) => {
    const state = context.req._deta
    if (!state)
      return

    state.interceptor.dispose()
    const time = calculateTime(state)
    renderTime.labels(state.path).set(time.render)
    requestTime.labels(state.path).set(time.request)
    totalTime.labels(state.path).set(time.total)
    if (option.verbose) {
      consola.info('[analytics] api request time:', time.request)
      consola.info('[analytics] render time:', time.render)
      consola.info('[analytics] total time:', time.total)
    }
  })
}

declare module 'http' {
  interface IncomingMessage {
    _deta: AnalyticsModuleState
  }
}

declare module '@nuxt/types' {
  interface NuxtOptions {
    analytics?: Partial<AnalyticsModuleParams>
  }
}

export default module

