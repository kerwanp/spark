import app from '@adonisjs/core/services/app'
import type { SparkService } from '../src/types.js'

let spark: SparkService

await app.booted(async () => {
  spark = await app.container.make('spark')
})

export { spark as default }
