import path from 'path'
import { createPage, setupTest } from '@nuxt/test-utils'

describe('NuxtLogo', () => {
  setupTest({
    rootDir: path.resolve(__dirname, '../playground/'),
    browser: true,
  })

  test('is a Vue instance', async () => {
    const page = await createPage('/')
    const content = await page.innerText('body')
    expect(content).toContain('Welcome to your Nuxt Application')
  })
})
