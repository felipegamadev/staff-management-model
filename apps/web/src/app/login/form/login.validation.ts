import * as z from 'zod'

export const LoginFormSchema = z.object({
    email: z
        .string()
        .min(1, { message: 'Email required' })
        .email({ message: 'Invalid email' })
        .trim(),
    password: z.string().min(1, { message: 'Password required' }).trim()
})

export type LoginFormFields = z.infer<typeof LoginFormSchema>
