"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { GlobalContextProvider } from  "@/app/context/globalContext"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Return a NextThemesProvider component with the props passed in to the ThemeProvider component
  return (<NextThemesProvider {...props}>
  
  <GlobalContextProvider> {children}</GlobalContextProvider> 
    </NextThemesProvider>)
}
