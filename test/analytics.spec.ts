import path from 'path'
import { createPage, getContext, setupTest } from '@nuxt/test-utils'

describe('module tests', () => {
  setupTest({
    rootDir: path.resolve(__dirname, '../playground/'),
    browser: true,
  })

  it('health page check', async () => {
    const page = await createPage('/health')
    expect(await page.innerText('body')).toContain('ok')
  })

  it('node metrics check', async () => {
    await createPage('/')
    const page = await createPage('/metrics')
    const content = await page.innerText('body')
    expect(content).toMatch(/^process_start_time_seconds\ \d+/gm)
  })

  it('custom metrics check', async () => {
    const ctx = getContext()
    const page = await createPage('/')
    await page.goto(`${ctx.url}/a`)
    await page.goto(`${ctx.url}/b`)
    await page.goto(`${ctx.url}/metrics`)
    const content = await page.innerText('body')

    expect(content).toMatch(/page_render_time\{path=\"index: \/\"}\ \d+/gm)
    expect(content).toMatch(/page_render_time\{path=\"a: \/a\"}\ \d+/gm)
    expect(content).toMatch(/page_render_time\{path=\"b: \/b\"}\ \d+/gm)

    expect(content).toMatch(/page_request_time\{path=\"index: \/\"}\ \d+/gm)
    expect(content).toMatch(/page_request_time\{path=\"a: \/a\"}\ \d+/gm)
    expect(content).toMatch(/page_request_time\{path=\"b: \/b\"}\ \d+/gm)

    expect(content).toMatch(/page_total_time\{path=\"index: \/\"}\ \d+/gm)
    expect(content).toMatch(/page_total_time\{path=\"a: \/a\"}\ \d+/gm)
    expect(content).toMatch(/page_total_time\{path=\"b: \/b\"}\ \d+/gm)
  })
})
