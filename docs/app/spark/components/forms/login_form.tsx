import User from '#models/user'
import { Spark } from '@foadonis/spark'
import { Form } from '@foadonis/spark/form'
import vine from '@vinejs/vine'

const FormSchema = vine.create({
  email: vine.string().email(),
  password: vine.string(),
})

export async function LoginForm(this: Spark) {
  const form = await this.form(FormSchema)

  if (form.isSubmitted && form.isValid) {
    const user = await User.verifyCredentials(form.parsed.email, form.parsed.password)
    await this.ctx.auth.use().login(user)
    this.redirect('home')
  }

  return (
    <Form form={form}>
      <div>
        <label>Email</label>
        <input name="email" type="email" />
      </div>
      <div>
        <label>Password</label>
        <input name="password" type="password" />
      </div>
      <button type="submit">Login</button>
    </Form>
  )
}
