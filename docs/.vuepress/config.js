export default {
  lang: 'zh-CN',
  title: '我的 VuePress 博客',
  description: '基于 VuePress + GitHub Pages 的个人博客',
  themeConfig: {
    navbar: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/blog/' }
    ],
    sidebar: {
      '/blog/': [
        {
          text: '文章列表',
          children: [
            '/blog/first-post.md',
            '/blog/second-post.md'
          ]
        }
      ]
    }
  }
}
