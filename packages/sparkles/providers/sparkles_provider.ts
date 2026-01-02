import { type ApplicationService } from '@adonisjs/core/types'
import { Sparkles } from '../src/sparkles.js'
import { type SparklesConfig } from '../src/types.js'

export default class SparklesProvider {
  constructor(protected app: ApplicationService) {}

  register() {
    this.app.container.singleton(Sparkles, async (resolver) => {
      const logger = await resolver.make('logger')
      const router = await resolver.make('router')
      const config = this.app.config.get<SparklesConfig>('sparkles')

      return new Sparkles(
        config,
        router,
        logger.child({
          service: 'sparkles',
        })
      )
    })
  }

  async boot() {
    const sparkles = await this.app.container.make(Sparkles)
    await sparkles.boot()
  }
}
