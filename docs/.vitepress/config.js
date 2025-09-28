export default {
  title: "JinbaoWeb",
  description: "基于 VitePress 构建",
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "Recsys", link: "/recsys" },
      { text: "关于", link: "/" }
    ],
    sidebar: []
  },
  markdown: {
    async config(md) {
      const mathjax3 = (await import('https://unpkg.com/markdown-it-mathjax3@5.1.0/index.js')).default
      md.use(mathjax3)
    }
  }
}
