import type { NextConfig } from "next";
import withMDX from '@next/mdx'

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ['ts', 'tsx', 'mdx'],
};

export default withMDX()(nextConfig);
