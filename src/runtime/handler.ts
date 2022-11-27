import { register } from 'prom-client'
import type { RequestHandler, Response } from 'express'

export default async function (_: RequestHandler, res: Response) {
  try {
    res.setHeader('Content-Type', register.contentType)
    res.end(await register.metrics())
  }
  catch (e) {
    res.statusCode = 500
    res.end(e)
  }
}
