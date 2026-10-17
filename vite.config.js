import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'

// 1. Find the folder where your pages live
const pagesDir = fileURLToPath(new URL('./frontend/pages', import.meta.url))

// 2. Make a list of every .html file in it (except the test page)
const pages = Object.fromEntries(
  readdirSync(pagesDir)
    .filter((f) => f.endsWith('.html') && f !== 'test-supabase.html')
    .map((f) => [f.replace('.html', ''), resolve(pagesDir, f)])
)

// 3. Tell Vite: "pack THESE pages"
export default defineConfig({
  build: { rollupOptions: { input: pages } },
})