import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.stl', '**/*.obj', '**/*.mtl', '**/*.glb', '**/*.gltf', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg', '**/*.gif', '**/*.mp4', '**/*.webm', '**/*.ogg', '**/*.mp3', '**/*.wav', '**/*.flac', '**/*.aac', '**/*.woff', '**/*.woff2', '**/*.eot', '**/*.ttf', '**/*.otf'],
})
