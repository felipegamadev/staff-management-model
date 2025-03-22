'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export function LogoutComponent(): React.JSX.Element {
    const router = useRouter()

    async function logout(): Promise<void> {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
                {
                    method: 'POST',
                    credentials: 'include'
                }
            )
            if (response.ok) {
                router.push('/login')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <button
            type="button"
            onClick={() => {
                void logout()
            }}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
            Logout
        </button>
    )
}
