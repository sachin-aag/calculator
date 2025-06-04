import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { SimpleCalculator } from "./SimpleCalculator"
import { ScientificCalculator } from "./ScientificCalculator"
import { UnitConverter } from "./UnitConverter"
import { CurrencyConverter } from "./CurrencyConverter"
import { ThemeToggle } from "./ThemeToggle"

export function CalculatorTabs() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CalcPro
              </h1>
              <span className="text-sm text-muted-foreground">v1.0</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="simple" className="w-full">
            {/* Navigation */}
            <div className="mb-8">
              <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground w-full sm:w-auto">
                <TabsTrigger value="simple" className="px-6">Simple</TabsTrigger>
                <TabsTrigger value="scientific" className="px-6">Scientific</TabsTrigger>
                <TabsTrigger value="unit" className="px-6">Unit Converter</TabsTrigger>
                <TabsTrigger value="currency" className="px-6">Currency</TabsTrigger>
              </TabsList>
            </div>

            {/* Calculator Content */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <TabsContent value="simple">
                <SimpleCalculator />
              </TabsContent>
              <TabsContent value="scientific">
                <ScientificCalculator />
              </TabsContent>
              <TabsContent value="unit">
                <UnitConverter />
              </TabsContent>
              <TabsContent value="currency">
                <CurrencyConverter />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              CalcPro.
            </p>
            
          </div>
        </div>
      </footer>
    </div>
  )
} 