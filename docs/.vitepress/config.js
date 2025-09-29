export default {
  title: "JinbaoWeb",
  description: "Learning by Doing",
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
        src: "https://cdn.jsdelivr.net/npm/mathjax@4.0.0/sre/speech-worker.min.js",
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
