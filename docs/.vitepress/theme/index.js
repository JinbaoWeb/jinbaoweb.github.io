import DefaultTheme from 'vitepress/theme'
import CategoryPage from './CategoryPage.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('CategoryPage', CategoryPage)
  }
}
