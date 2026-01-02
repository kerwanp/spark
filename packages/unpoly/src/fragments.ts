import { type SparkNode } from '@sparkjs/spark'

/**
 * Wrapper class for managing Unpoly fragments.
 */
export class Fragments {
  #fragments = new Map<string, SparkNode>()

  register(id: string, node: SparkNode) {
    if (this.#fragments.has(id)) {
      console.warn(`<Up.Fragment id="${id}"> is rendered multiple times.`)
    }

    this.#fragments.set(id, node)
  }

  get(id: string) {
    return this.#fragments.get(id)
  }
}
