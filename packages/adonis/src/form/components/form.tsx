import '@adonisjs/shield/shield_provider'

import { StandardSchemaV1 } from '@standard-schema/spec'
import { SparkForm } from '../form.js'
import { CSRFInput } from './csrf_input.jsx'
import { ComponentProps, Spark } from '@sparkjs/spark'

export interface FormProps<Schema extends StandardSchemaV1 = any> extends ComponentProps<'form'> {
  form: SparkForm<Schema>
}

export function Form(this: Spark, { form, children, ...props }: FormProps) {
  return (
    <form method={form.options.method} {...props}>
      <CSRFInput />
      {children}
    </form>
  )
}
