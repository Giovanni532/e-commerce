'use client'

import { UserProvider } from "@/provider/userProvider"
import { NextUIProvider } from "@nextui-org/react"

interface ProviderProps {
  children: React.ReactNode
}


export default function Provider({ children }: ProviderProps) {
  return (
    <UserProvider>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </UserProvider>
  )
}
