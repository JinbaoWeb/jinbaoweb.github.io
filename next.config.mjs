import withMDX from "@next/mdx"({
  extension: /\.mdx?$/,
});

const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx"],
  output: "export", // 静态导出，适配 GitHub Pages
  images: {
    unoptimized: true, // GitHub Pages 无法优化图片
  },
};

export default withMDX(nextConfig);
