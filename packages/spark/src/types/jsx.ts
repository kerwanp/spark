import type { HTML } from './html.js'

type JSXElementConstructor<P> = (props: P) => SparkNode

export type SparkElement<
  P = {},
  T extends string | JSXElementConstructor<P> | symbol =
    | string
    | JSXElementConstructor<any>
    | symbol,
> = {
  $$typeof: symbol
  type: T
  props: P
  hash?: string
}

export type AwaitedSparkNode =
  | SparkElement
  | string
  | number
  | bigint
  | Iterable<SparkNode>
  | boolean
  | null
  | undefined

export type SparkNode =
  | SparkElement
  | string
  | number
  | bigint
  | Iterable<SparkNode>
  | boolean
  | null
  | undefined
  | Promise<AwaitedSparkNode>

export interface FunctionComponent<P = {}> {
  (props: P): SparkNode
}

export type FC<P = {}> = FunctionComponent<P>

export type ComponentProps<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> =
  T extends JSXElementConstructor<infer Props>
    ? Props
    : T extends keyof JSX.IntrinsicElements
      ? JSX.IntrinsicElements[T]
      : {}

export type PropsWithChildren<P = {}> = { children?: SparkNode } & P

declare global {
  namespace JSX {
    type ElementType<P = any> = string | JSXElementConstructor<any>

    interface Element extends SparkElement<any, any> {}

    interface ElementAttributesProperty {
      $props: {}
    }

    interface ElementChildrenAttribute {
      children: {}
    }

    interface IntrinsicAttributes {}
    interface IntrinsicElements extends HTML.Elements, HTML.SVGElements {}
  }
}
