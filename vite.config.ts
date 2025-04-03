import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://localhost:44319',
        secure: false,
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  optimizeDeps: {
    include: ['@monaco-editor/react']
  }
}); 
}); 