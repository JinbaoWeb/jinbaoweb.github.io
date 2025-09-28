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
  }
}


import { defineConfig } from 'vitepress'

export default defineConfig({
  // 其他配置...
  
  head: [
    // 引入 MathJax CDN
    ['script', {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-mml-chtml.js',
      async: 'async'
    }],
    
    // MathJax 配置
    ['script', { type: 'text/x-mathjax-config' }, `
      MathJax = {
        tex: {
          inlineMath: [['$', '$'], ['\\(', '\\)']],
          displayMath: [['$$', '$$'], ['\\[', '\\]']],
          processEscapes: true,
          tags: 'ams'
        },
        options: {
          skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
          ignoreHtmlClass: 'tex2jax_ignore',
          processHtmlClass: 'tex2jax_process'
        }
      };
    `]
  ],

  // 配置 Vue 编译器选项
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => {
          const mathjaxTags = [
            'math', 'maction', 'maligngroup', 'malignmark', 'menclose', 'merror',
            'mfenced', 'mfrac', 'mi', 'mlongdiv', 'mmultiscripts', 'mn', 'mo',
            'mover', 'mpadded', 'mphantom', 'mroot', 'mrow', 'ms', 'mscarries',
            'mscarry', 'msgroup', 'mstack', 'msline', 'mspace', 'msqrt', 'msrow',
            'mstyle', 'msub', 'msup', 'msubsup', 'mtable', 'mtd', 'mtext', 'mtr',
            'munder', 'munderover', 'semantics', 'annotation', 'annotation-xml'
          ]
          return mathjaxTags.includes(tag)
        }
      }
    }
  }
})
