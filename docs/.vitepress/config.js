import mathjax3 from "markdown-it-mathjax3";
const customElements = [
	"math","maction","maligngroup","malignmark","menclose","merror","mfenced","mfrac","mi","mlongdiv","mmultiscripts",
	"mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mscarries","mscarry","mscarries","msgroup","mstack",
	"mlongdiv","msline","mstack","mspace","msqrt","msrow","mstack","mstack","mstyle","msub","msup","msubsup","mtable",
	"mtd","mtext","mtr","munder","munderover","semantics","math","mi","mn","mo","ms","mspace","mtext","menclose",
	"merror","mfenced","mfrac","mpadded","mphantom","mroot","mrow","msqrt","mstyle","mmultiscripts","mover","mprescripts",
	"msub","msubsup","msup","munder","munderover","none","maligngroup","malignmark","mtable","mtd","mtr",
	"mlongdiv","mscarries","mscarry","msgroup","msline","msrow","mstack","maction","semantics","annotation",
	"annotation-xml","mjx-container","mjx-assistive-mml",
];


export default {
  title: "JinbaoWeb",
  description: "Learning by Doing",
  themeConfig: {
	siteTitle: '算法之巅',
	logo: '/favicon.ico',
    nav: [
      { text: "首页", link: "/" },
      { text: "机器学习", link: "/ml" },
      { text: "深度学习", link: "/ml" },
      { text: "推荐算法", link: "/recsys" },
      { text: "大模型", link: "/llm" },
      { text: "关于", link: "/about" }
    ],
    footer: {
      copyright: 'Copyright © 2017-present Jinbao'
    }
  },
  markdown: {
    config: (md) => {
	  md.use(mathjax3);
	},
	image: {
      lazyLoading: true
    }
  }
}
