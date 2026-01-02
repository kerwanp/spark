import { type HttpContext, type Router } from '@adonisjs/core/http'
import { type Logger } from '@adonisjs/core/logger'
import { DocumentationCollection } from './collections/documentation_collection.js'

import '@sparkjs/adonis/spark_provider'
import { StaticSiteGenerator } from './generator.js'
import { type SparklesConfig } from './types.js'
import { type Documentation, type DocumentationPage } from './loaders/documentation_loader.js'

export class Sparkles {
  #config: SparklesConfig
  #logger: Logger
  #router: Router

  collections: DocumentationCollection[]

  constructor(config: SparklesConfig, router: Router, logger: Logger) {
    this.#config = config
    this.#router = router
    this.#logger = logger

    this.collections = config.documentations.map(
      (options) =>
        new DocumentationCollection({
          ...options,
          cache: config.cache,
        })
    )
  }

  async boot() {
    this.#logger.info('Initializing Sparkles content')

    for (const collection of this.collections) {
      await collection.hydrate()

      this.#router
        .group(() => {
          this.#router.get('/', this.handler.bind(this))
          this.#router.get('/*', this.handler.bind(this))
        })
        .prefix(collection.options.prefix)
    }

    this.#logger.info('Sparkles initialized')
  }

  #loadDocumentations() {
    return Promise.all(
      this.collections.map(async (collection) => {
        const query = await collection.load()
        return query.all()
      })
    )
  }

  async handler({ request, response, spark }: HttpContext) {
    const { default: Page } = await this.#config.page()

    const url = request.url()
    const documentations = await this.#loadDocumentations()
    const documentation = documentations.find((entry) => url.startsWith(entry.prefix))

    if (!documentation) {
      return response.notFound()
    }

    const page = documentation.pages.find((entry) => entry.slug === url)

    if (!page) {
      return response.notFound()
    }

    return spark.render(Page, {
      documentations,
      documentation,
      page,
    })
  }

  async export() {
    const documentations = await this.#loadDocumentations()

    const routes = documentations.flatMap((documentation) =>
      documentation.pages.map((page) => page.slug)
    )

    const generator = new StaticSiteGenerator({
      url: new URL('http://localhost:3333'),
      output: this.#config.output,
      routes,
      logger: this.#logger,
    })

    await generator.export()
  }
}

declare module '@sparkjs/spark' {
  interface Spark {
    documentations: Documentation[]
    documentation: Documentation
    page: DocumentationPage
  }
}
