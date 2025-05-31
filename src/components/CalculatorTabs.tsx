import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { SimpleCalculator } from "./SimpleCalculator"
import { ScientificCalculator } from "./ScientificCalculator"
import { UnitConverter } from "./UnitConverter"
import { CurrencyConverter } from "./CurrencyConverter"
import { ThemeToggle } from "./ThemeToggle"

export function CalculatorTabs() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">CalcPro</h1>
        <ThemeToggle />
      </div>
      <Tabs defaultValue="simple" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="simple">Simple</TabsTrigger>
          <TabsTrigger value="scientific">Scientific</TabsTrigger>
          <TabsTrigger value="unit">Unit Converter</TabsTrigger>
          <TabsTrigger value="currency">Currency</TabsTrigger>
        </TabsList>
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
      </Tabs>
    </div>
  )
} 