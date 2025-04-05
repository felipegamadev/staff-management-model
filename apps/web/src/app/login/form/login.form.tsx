'use client'

import React, { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginFormSchema, type LoginFormFields } from './login.validation'
import { useRouter } from 'next/navigation'
import { WarningComponent } from '@/components'

export default function LoginForm(): React.JSX.Element {
    const router = useRouter()
    const [pending, setPending] = useState(false)
    const [warning, setWarning] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormFields>({
        resolver: zodResolver(LoginFormSchema)
    })

    const onSubmit: SubmitHandler<LoginFormFields> = async (
        data: LoginFormFields
    ) => {
        setPending(true)
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                    credentials: 'include'
                }
            )
            if (response.ok) {
                router.push('/profile')
            }
        } catch (error) {
            setPending(false)
            setWarning(true)
        }
    }

    return (
        <>
            {warning && (
                <WarningComponent
                    onClose={() => {
                        setWarning(false)
                    }}
                />
            )}
            <form
                onSubmit={(event) => {
                    void handleSubmit(onSubmit)(event)
                }}
                className="space-y-4 md:space-y-6"
            >
                <div>
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Email
                    </label>
                    <div className="relative">
                        <input
                            {...register('email')}
                            type="text"
                            placeholder="name@company.com"
                            className={`border rounded-lg block w-full p-2.5 ${errors?.email?.message == null ? 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-600 dark:bg-gray-700 focus:border-primary-600 dark:text-white dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500' : 'bg-red-50 border-red-500 text-gray-900 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-white dark:border-red-500 dark:placeholder-gray-400'}`}
                        />
                        <div className="absolute inset-y-0 end-0 flex items-center me-3.5 pointer-events-none">
                            <svg
                                className="w-[24px] h-[23px] text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z" />
                                <path d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z" />
                            </svg>
                        </div>
                    </div>
                    {errors?.email?.message != null && (
                        <p className="mt-2 text-xs text-red-600 dark:text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Password
                    </label>
                    <div className="relative">
                        <input
                            {...register('password')}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            className={`border rounded-lg block w-full p-2.5 ${errors?.password?.message == null ? 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-600 dark:bg-gray-700 focus:border-primary-600 dark:text-white dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500' : 'bg-red-50 border-red-500 text-gray-900 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-white dark:border-red-500 dark:placeholder-gray-400'}`}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 end-0 flex items-center me-3.5"
                            onMouseDown={() => {
                                setShowPassword(true)
                            }}
                            onMouseUp={() => {
                                setShowPassword(false)
                            }}
                            onMouseLeave={() => {
                                setShowPassword(false)
                            }}
                        >
                            {showPassword ? (
                                <svg
                                    className="w-[24px] h-[25px] text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="w-[24px] h-[25px] text-gray-500 dark:text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                                    />
                                    <path
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                    {errors?.password?.message != null && (
                        <p className="mt-2 text-xs text-red-600 dark:text-red-500">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="remember"
                                aria-describedby="remember"
                                type="checkbox"
                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label
                                htmlFor="remember"
                                className="text-gray-500 dark:text-gray-300"
                            >
                                Remember me
                            </label>
                        </div>
                    </div>
                    <a
                        href="#"
                        className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                        Forgot password?
                    </a>
                </div>

                {pending ? (
                    <button
                        type="button"
                        className="w-full text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 text-center"
                        disabled
                    >
                        <svg
                            aria-hidden="true"
                            role="status"
                            className="inline w-4 h-4 me-3 text-white animate-spin"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="#E5E7EB"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentColor"
                            />
                        </svg>
                        Loading...
                    </button>
                ) : (
                    <button
                        type="submit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        Sign in
                    </button>
                )}

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{' '}
                    <a
                        href="#"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                        Sign up
                    </a>
                </p>
            </form>
        </>
    )
}
