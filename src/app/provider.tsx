'use client'

import { StoreProvider } from "@/provider/storeProvider"
import { UserProvider } from "@/provider/userProvider"
import { NextUIProvider } from "@nextui-org/react"

interface ProviderProps {
  children: React.ReactNode
}


export default function Provider({ children }: ProviderProps) {
  return (
    <StoreProvider>
      <UserProvider>
        <NextUIProvider>
          {children}
        </NextUIProvider>
      </UserProvider>
    </StoreProvider>
  )
}
