import { type HttpContext } from '@adonisjs/core/http'
import { type NextFn } from '@adonisjs/core/types/http'
import { Readable } from 'node:stream'
import { SparkManager } from '../spark_manager.js'
import { renderToReadableStream } from '@sparkjs/spark'
import { isJSXElement } from '@sparkjs/spark/utils'
import { type Spark } from '../spark.js'

export default class SparkMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const manager = await ctx.containerResolver.make(SparkManager)
    const instance = manager.createInstance(ctx)

    ctx.spark = instance

    await next()

    // TODO: Make it work properly
    if (ctx.response.hasContent && ctx.response.content?.length) {
      const content = ctx.response.content[0]

      if (isJSXElement(content)) {
        const stream = renderToReadableStream(content)
        ctx.response.header('Content-Type', 'text/html').stream(Readable.from(stream as any))
        ctx.response.lazyBody.content = undefined
      }
    }
  }
}

declare module '@adonisjs/core/http' {
  export interface HttpContext {
    spark: Spark
  }
}
