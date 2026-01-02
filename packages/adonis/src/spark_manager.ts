import { type HttpContext } from '@adonisjs/core/http'
import { Spark } from './spark.js'

export class SparkManager {
  createInstance(ctx: HttpContext) {
    const spark = new Spark(ctx)
    return spark
  }
}
