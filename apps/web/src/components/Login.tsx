'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export function LoginComponent(): React.JSX.Element {
    const router = useRouter()

    async function login(formData: FormData): Promise<void> {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(Object.fromEntries(formData)),
                    credentials: 'include'
                }
            )

            if (response.ok) {
                router.push('/profile')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form
            className="space-y-4 md:space-y-6"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault()
                const formData = new FormData(e.target as HTMLFormElement)
                void login(formData)
            }}
        >
            <div>
                <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Your email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                />
            </div>
            <div>
                <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
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

            <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
                Sign in
            </button>
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
    )
}
