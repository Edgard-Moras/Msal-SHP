import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://ltfb.sharepoint.com/sites/tacama/_catalogs/masterpage/aplicaciones/dist/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react'],
          // 'react-dom': ['react-dom'],
          // 'react-router-dom': ['react-router-dom'],
        },
      },
      input: {
        main: path.resolve(__dirname, 'index.html'),
        // config: path.resolve(__dirname, 'src', 'config/configApp.ts'),
      },
    },
     chunkSizeWarningLimit: 3000,
    minify: true,
    sourcemap:true
  },
})
