import DefaultTheme from 'vitepress/theme'
import CategoryPage from './CategoryPage.vue'
import ListPage from './ListPage.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('CategoryPage', CategoryPage)
    app.component('list', ListPage)
  }
}
