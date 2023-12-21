import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: false,
    viewportWidth: 1440,
    viewportHeight: 1000,
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
    },
  },
})