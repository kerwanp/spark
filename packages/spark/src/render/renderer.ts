import { type SparkNode } from '../types/jsx.js'
import { AsyncRenderer, IterableRenderer, JSXRenderer, LiteralsRenderer } from './renderers.js'

export interface SparkRendererOptions {
  /**
   * Callback function when chunk value
   * is written during render process.
   */
  onWrite(chunk: string): void

  /**
   * Callback function when an error occured
   * during render process.
   */
  onError(error: Error): void
}

export class SparkRenderer {
  #renderers = new Map<string, RendererFn>()

  static renderers = new Map<string, RendererFn>()

  constructor(public options: SparkRendererOptions) {
    this.#renderers = new Map([
      [LiteralsRenderer.name, LiteralsRenderer],
      [IterableRenderer.name, IterableRenderer],
      [AsyncRenderer.name, AsyncRenderer],
      [JSXRenderer.name, JSXRenderer],
      ...SparkRenderer.renderers,
    ])
  }

  static register<I extends JSX.Element>(renderer: RendererFn<I>) {
    if (this.renderers.has(renderer.name)) {
      console.warn(`Could not register renderer "${renderer.name}" has it already exist`)
    }

    this.renderers.set(renderer.name, renderer as any)
  }

  async render(node: SparkNode) {
    for (const [, renderer] of this.#renderers.entries()) {
      const rendered = await renderer.render(node, this)
      if (rendered) return true
    }

    return false
  }

  /**
   * Write chunk value to the output.
   */
  write(chunk: string) {
    this.options.onWrite(chunk)
    return true
  }

  /**
   * Emit rendering error
   */
  error(error: Error) {
    this.options.onError(error)
  }
}

export type RendererFn<I extends SparkNode = SparkNode> = {
  name: string
  render: (node: I, renderer: SparkRenderer) => Promise<boolean>
}
