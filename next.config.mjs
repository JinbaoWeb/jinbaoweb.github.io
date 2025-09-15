import withMDX from "@next/mdx"({
  extension: /\.mdx?$/,
});

const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx"],
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // GitHub Pages 无法优化图片
  },
};

export default nextConfig;
