import React from "react"
import { ThemeProvider } from "./components/theme-provider"
import { CalculatorTabs } from "./components/CalculatorTabs"
import { Toaster } from "sonner"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster position="top-right" />
      <CalculatorTabs />
    </ThemeProvider>
  )
}

export default App 