# Project template for a Nuxt 2 module development
You can clone this project and develop your own module, all the necessary tools are pre-configured.

## What is pre-configured
* Build via [unbuild](https://github.com/unjs/unbuild)
* Rebuild when files change
* Jest
* Playwright
* Nuxt test utils
* Typescript
* Nuxt playground for the development purpose
* Github actions for CI/CD. Note: Note: the secret variable NPM_TOKEN is required for automatic release to the registry, also set "private" to false in you package.json
* Husky with pre-push hook

## Requirements
* Node JS ^16.0.0, Nuxt 2 does not support higher versions
* Pnpm