import app from '@adonisjs/core/services/app'
import { defineConfig, sources } from '@sparkjs/sparkles'

export default defineConfig({
  markdown: {
    rehypePlugins: [],
    remarkPlugins: [],
  },
  output: app.makeURL('build'),
  cache: false,
  documentations: [
    {
      prefix: '/docs/spark',
      source: sources.fs({
        path: new URL('../../packages/spark/docs/', import.meta.url),
      }),
    },
    {
      prefix: '/docs/adonis',
      source: sources.fs({
        path: new URL('../../packages/adonis/docs/', import.meta.url),
      }),
    },
    {
      prefix: '/docs/unpoly',
      source: sources.fs({
        path: new URL('../../packages/unpoly/docs/', import.meta.url),
      }),
    },
    {
      prefix: '/docs/sparkles',
      source: sources.fs({
        path: new URL('../../packages/sparkles/docs/', import.meta.url),
      }),
    },
  ],
  page: () => import('../app/spark/pages/doc_page.jsx'),
})
