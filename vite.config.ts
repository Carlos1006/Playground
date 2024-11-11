import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      sass: {
        api: "modern-compiler", // or "modern"
      },
      scss: {
        api: "modern-compiler", // or "modern"
        silenceDeprecations: ["legacy-js-api"],
      },
    },
    modules: {
      generateScopedName: "[name]__[local]__[hash:base64:5]",
    },
  },
  plugins: [react()],
  assetsInclude: [
    "**/*.stl",
    "**/*.obj",
    "**/*.mtl",
    "**/*.glb",
    "**/*.gltf",
    "**/*.png",
    "**/*.jpg",
    "**/*.jpeg",
    "**/*.svg",
    "**/*.gif",
    "**/*.mp4",
    "**/*.webm",
    "**/*.ogg",
    "**/*.mp3",
    "**/*.wav",
    "**/*.flac",
    "**/*.aac",
    "**/*.woff",
    "**/*.woff2",
    "**/*.eot",
    "**/*.ttf",
    "**/*.otf",
    "**/*.ico",
    "**/*.fbx",
    "**/*.glsl",
    "**/*.tif",
  ],
});
