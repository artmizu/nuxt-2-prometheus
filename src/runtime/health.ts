import type { RequestHandler, Response } from 'express'

export default function (_: RequestHandler, res: Response) {
  res.end('ok')
}
