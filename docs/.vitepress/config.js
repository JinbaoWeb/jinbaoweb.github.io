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
  head: [
    // 外部 MathJax 脚本
    [
      "script",
      {
        src: "https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML",
        type: "text/javascript"
      }
    ],
    // 内联配置脚本
    [
      "script",
      { type: "text/x-mathjax-config" },
      `
      MathJax.Hub.Config({
        tex2jax: {
          inlineMath: [['$','$'], ["\\\\(","\\\\)"]],
          processEscapes: true
        },
        TeX: {
          equationNumbers: { autoNumber: "AMS" }
        },
        messageStyle: "none",
        SVG: { blacker: 1 }
      });
      `
    ]
  ]
}
