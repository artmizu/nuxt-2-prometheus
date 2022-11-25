import { defineBuildConfig } from 'unbuild'

const outDir = 'dist'

export default defineBuildConfig({
  declaration: true,
  outDir,
  entries: [
    'src/module',
    { input: 'src/runtime/', outDir: `${outDir}/runtime`, ext: 'mjs' },
  ],
  rollup: {
    emitCJS: true,
    cjsBridge: true,
  },
  externals: [
    'nuxt',
    'vue',
    'vue-demi',
  ],
})
