![GitHub Workflow Status](https://img.shields.io/github/workflow/status/artmizu/analytics-nuxt-2/CI?label=CI&style=plastic) ![GitHub Workflow Status](https://img.shields.io/github/workflow/status/artmizu/analytics-nuxt-2/release-please?label=release&style=plastic)

(Cover)[https://raw.githubusercontent.com/artmizu/analytics-nuxt-2/main/.github/cover.jpg]

# 📊 Nuxt 2 Analytics 
Allows you to better understand what's going on with your application and how to optimize performance and other things in production

## Features
* Default NodeJS metrics exported through the prometheus middleware
* Custom metrics about pages render time and external request consumption time
* Health check middleware

## Default routes
* `/metrics` - prometheus metrics
* `/health` - health check

## Installation
Install package via a package manager: 
```bash
# using npm
npm install --save-dev @artmizu/nuxt-analytics

# using yarm
yarn add -D @artmizu/nuxt-analytics

# using pnpm
pnpm add -D @artmizu/nuxt-analytics
```

Add it to a modules section of your nuxt config:
```js
export default {
  modules: ['@artmizu/nuxt-analytics']
}
```

## Options
You can pass it through module options and the nuxt config property `sitemap`.

### verbose
- Type: `boolean`
- Default: `true`
- Description: Additional logs in dev mode, about page rendering time and time of external API requests