import { Up } from '@sparkjs/unpoly'
import DocsLayout from '../layouts/docs_layout.tsx'
import { MARKDOWN_COMPONENTS } from '../components/markdown.tsx'
import { TOC } from '../components/toc.tsx'
import { ComponentProps, createContext } from '@sparkjs/spark'
import { Documentation } from '@sparkjs/sparkles/loaders'
import { DocumentationPageComponent } from '@sparkjs/sparkles'
import { Providers } from '../providers.tsx'

export const DocumentationContext = createContext<{
  documentations: Documentation[]
  documentation: Documentation
}>()

export default async function DocPage(props: ComponentProps<DocumentationPageComponent>) {
  return (
    <Providers>
      <DocumentationContext.Provider value={props}>
        <Up.Fragment id="content">
          <article
            id="page"
            className="relative flex flex-col [grid-area:main] px-4 py-6 gap-4 md:px-9 md:pt-8 xl:px-14 xl:pt-14 *:max-w-[900px]"
          >
            <div className="border-b pb-4 space-y-4">
              <h1 className="text-[1.75em] font-semibold">{props.page.title}</h1>
              <p className="empty:hidden text-lg text-muted-foreground">{props.page.description}</p>
            </div>
            <div className="prose dark:prose-invert">
              <props.page.content components={MARKDOWN_COMPONENTS} />
            </div>
          </article>
          <TOC toc={props.page.toc} />
        </Up.Fragment>

        <DocsLayout>
          <Up.Slot fragmentId="content" />
        </DocsLayout>
      </DocumentationContext.Provider>
    </Providers>
  )
}
