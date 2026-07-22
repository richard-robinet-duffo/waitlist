import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root — sibling lockfiles otherwise confuse inference.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
