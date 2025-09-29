// docs/.vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import MyLayout from './Layout.vue'

export default {
  ...DefaultTheme,
  // 覆盖默认 Layout
  Layout: MyLayout
}
