'use client'

import { SessionProvider } from 'next-auth/react'

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Override the parent admin layout for login page
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

