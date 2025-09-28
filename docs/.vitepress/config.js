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
    config: (md) => {
      // 行内公式：$...$
      md.inline.ruler.after('escape', 'math_inline', function (state, silent) {
        const max = state.posMax
        const start = state.pos
        if (state.src[start] !== '$') return false
        let match = start + 1
        while (match < max && state.src[match] !== '$') match++
        if (match === max) return false
        if (!silent) {
          state.push({
            type: 'math_inline',
            content: state.src.slice(start + 1, match),
            level: state.level
          })
        }
        state.pos = match + 1
        return true
      })
      md.renderer.rules.math_inline = (tokens, idx) => {
        return `\\(${tokens[idx].content}\\)`
      }

      // 块级公式：$$...$$
      md.block.ruler.after('blockquote', 'math_block', function (state, start, end, silent) {
        let pos = state.bMarks[start] + state.tShift[start]
        if (state.src.slice(pos, pos + 2) !== '$$') return false
        let match = state.src.indexOf('$$', pos + 2)
        if (match === -1) return false
        if (!silent) {
          state.push({
            type: 'math_block',
            content: state.src.slice(pos + 2, match).trim(),
            block: true,
            level: state.level
          })
        }
        state.line = start + 1
        return true
      })
      md.renderer.rules.math_block = (tokens, idx) => {
        return `<p>\\[${tokens[idx].content}\\]</p>`
      }
    }
  },
  head: [
    // 引入 MathJax v3 CDN
    [
      'script',
      {
        type: 'text/javascript',
        id: 'MathJax-script',
        async: 'true',
        src: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js'
      }
    ]
  ]
}
