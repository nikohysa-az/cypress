// @ts-check
const { defineConfig } = require('cypress')

// load the devServer function that comes with this plugin
// https://github.com/cypress-io/cypress/tree/master/npm/react#install
const { devServer } = require('@cypress/react/plugins/react-scripts')

const getApplitoolsWrappedSetupFn = (exports) => {
  const placeholderModule = { exports }
  require('@applitools/eyes-cypress')(placeholderModule)
  return placeholderModule.exports
}

module.exports = defineConfig({
  video: false,
  fixturesFolder: false,
  viewportWidth: 1000,
  viewportHeight: 1000,
  env: {
    coverage: false
  },
  component: {
    devServer,
    setupNodeEvents: getApplitoolsWrappedSetupFn((on, config) => {
      // component node events setup code
    })
  },
})