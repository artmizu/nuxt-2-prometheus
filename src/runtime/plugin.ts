import { BatchInterceptor } from '@mswjs/interceptors'
import nodeInterceptors from '@mswjs/interceptors/lib/presets/node'
import consola from 'consola'
import type { Context } from '@nuxt/types'
import type { AnalyticsModuleParams } from '../type'

export default (context: Context) => {
  // eslint-disable-next-line @typescript-eslint/quotes
  const options: AnalyticsModuleParams = JSON.parse(`<%= JSON.stringify(options) %>`)
  const path = context.route?.matched?.[0]?.path === '' ? '/' : context.route?.matched?.[0]?.path
  const name = context.route?.matched?.[0]?.name
  const interceptor = new BatchInterceptor({
    name: 'nuxt-analytics',
    interceptors: nodeInterceptors,
  })
  interceptor.apply()

  context.req._deta = {
    start: Date.now(),
    path: `${String(name)}: ${path}`,
    requests: {},
    interceptor,
  }

  interceptor.on('request', (req) => {
    context.req._deta.requests[req.url] = {
      start: Date.now(),
      end: Date.now(),
    }

    if (options.verbose)
      consola.info(`[analytics] request: ${req.url}, ${new Date().toISOString()}`)
  })

  interceptor.on('response', (_, res) => {
    if (context.req._deta.requests[res.url])
      context.req._deta.requests[res.url].end = Date.now()
  })
}
