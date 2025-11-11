import DefaultTheme from 'vitepress/theme'
import ListLayout from './ListLayout.vue'

export default {
  extends: DefaultTheme,

  Layout: () => {
    return {
      ...DefaultTheme.Layout,
      components: {
        ...DefaultTheme.Layout?.components,
        ListLayout
      }
    }
  },

  enhanceApp({ app }) {
    // 这里也可以注册全局组件
    app.component('ListLayout', ListLayout)
  }
}

