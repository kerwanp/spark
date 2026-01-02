import { type HttpContext } from '@adonisjs/core/http'
import { type StandardSchemaV1 } from '@standard-schema/spec'

export type SparkFormResult<Schema extends StandardSchemaV1> = {
  data: StandardSchemaV1.InferInput<Schema>
  errors: SparkFormErrorsResult
}

export async function SparkForm<Schema extends StandardSchemaV1>(
  ctx: HttpContext,
  schema: Schema
): Promise<SparkFormResult<Schema>> {
  const payload = ctx.request.all()
  const result = await schema['~standard'].validate(payload)

  return {
    data: payload,
    errors: SparkFormErrors(result.issues ?? []),
  }
}

export type SparkFormErrorsResult = ReturnType<typeof SparkFormErrors>

export function SparkFormErrors(_issues: readonly StandardSchemaV1.Issue[]) {
  function has(_path: string) {}

  function get(_path: string) {}

  function message(_path: string) {}

  return { has, get, message }
}
