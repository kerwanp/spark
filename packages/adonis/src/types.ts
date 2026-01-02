import { type ContainerBindings } from '@adonisjs/core/types'
import { type SparkManager } from './spark_manager.js'

export interface SparkService extends SparkManager {}

export type ResolvedContainerBindings<Bindings extends (keyof ContainerBindings)[]> = {
  [K in keyof Bindings]: ContainerBindings[Bindings[K]]
}
