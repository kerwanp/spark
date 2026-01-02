import { type SparkNode } from '../types/jsx.js'
import { SparkRenderer } from './renderer.js'

export async function renderToString(node: SparkNode) {
  let buffer = ''

  const renderer = new SparkRenderer({
    onWrite(chunk) {
      buffer += chunk
    },
    onError(error) {
      console.warn(error)
    },
  })

  await renderer.render(node)

  return buffer
}

const encoder = new TextEncoder()
export function renderToReadableStream(node: SparkNode) {
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const renderer = new SparkRenderer({
        onWrite(chunk) {
          controller.enqueue(encoder.encode(chunk))
        },
        onError(error) {
          console.error(error)
        },
      })

      await renderer.render(node)

      controller.close()
    },
  })

  return stream
}
