import withMDX from "@next/mdx";

const nextConfig = withMDX({
  extension: /\.mdx?$/,
})({
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "mdx", "md"],
});

export default nextConfig;
