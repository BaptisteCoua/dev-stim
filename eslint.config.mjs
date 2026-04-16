// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
   {
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "no-console": "warn",
    },
  },
)
