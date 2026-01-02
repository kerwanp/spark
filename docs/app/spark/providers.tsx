import { AdonisContext } from '@sparkjs/adonis'
import { PropsWithChildren } from '@sparkjs/spark'
import { UnpolyProvider } from '@sparkjs/unpoly'

export const Providers = ({ children }: PropsWithChildren) => {
  const adonis = AdonisContext.getOrFail()
  return (
    <UnpolyProvider
      request={adonis.context.request.request}
      response={adonis.context.response.response}
    >
      {children}
    </UnpolyProvider>
  )
}
