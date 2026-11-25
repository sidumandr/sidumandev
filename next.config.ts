import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // Admin panelinden yüklenen görseller (Vercel Blob)
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
  },
  experimental: {
    // Proje görseli ve CV yüklemeleri (4 MB sınırı sunucuda ayrıca denetlenir)
    serverActions: { bodySizeLimit: "5mb" },
  },
};

export default nextConfig;
