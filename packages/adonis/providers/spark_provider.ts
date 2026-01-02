import { type ApplicationService } from '@adonisjs/core/types'
import { SparkManager } from '../src/spark_manager.js'

declare module '@adonisjs/core/types' {
  export interface ContainerBindings {
    spark: SparkManager
  }
}

export default class SparkProvider {
  constructor(protected app: ApplicationService) {}

  register() {
    this.app.container.singleton('spark', async () => {
      return new SparkManager()
    })
  }

  async boot() {}

  async ready() {}
}
