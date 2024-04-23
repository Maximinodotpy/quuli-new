// vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite';
import { createRequire } from 'module'
import path from 'path'
import { defineConfig } from 'vite'
import { SvelteKitPWA } from '@vite-pwa/sveltekit'

const { resolve } = createRequire(import.meta.url)

const prismaClient = `prisma${path.sep}client`

const prismaClientIndexBrowser = resolve('@prisma/client/index-browser').replace(`@${prismaClient}`, `.${prismaClient}`)

export default defineConfig(() => ({
	plugins: [
      sveltekit(),
      SvelteKitPWA({
         manifest: {
            name: 'Quuli',
            short_name: 'Quuli',
            theme_color: '#000000',
            background_color: '#ffffff',
            display: 'standalone',
            start_url: '/',
            scope: '/',
         },
      }),
   ],
   resolve: { alias: { '.prisma/client/index-browser': path.relative(__dirname, prismaClientIndexBrowser) } },
}))