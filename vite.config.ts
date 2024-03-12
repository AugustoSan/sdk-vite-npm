/// <reference types="vite/client" />
import { resolve } from 'path'
import { defineConfig } from 'vite'

declare global {
    interface Window{
        ethereum: any
    }
}


export default defineConfig({
    build: {
        // También podría ser un diccionario o un array de múltiples puntos de entrada
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'SDKViteNPM',
            // Se agregará la extension apropiada.
            fileName: 'sdk-vite-npm',
            formats: ['es', 'cjs', 'umd', 'iife']
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                // Proporciona variables globales para usar en la compilación UMD
                // para dependencias externalizadas
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
    resolve: {
        alias: {
          '@': resolve(__dirname, 'src'),
        },
    }
});
