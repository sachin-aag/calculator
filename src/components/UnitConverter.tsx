import React, { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { Input } from "../components/ui/input"

type ConversionCategory = {
  name: string
  units: string[]
  convert: (value: number, from: string, to: string) => number
}

const categories: ConversionCategory[] = [
  {
    name: "Length",
    units: ["Meters", "Kilometers", "Miles", "Feet", "Inches", "Centimeters"],
    convert: (value, from, to) => {
      // Convert to meters first
      const toMeters: { [key: string]: number } = {
        Meters: 1,
        Kilometers: 1000,
        Miles: 1609.34,
        Feet: 0.3048,
        Inches: 0.0254,
        Centimeters: 0.01,
      }
      
      // Convert from meters to target unit
      const meters = value * toMeters[from]
      return meters / toMeters[to]
    }
  },
  {
    name: "Weight",
    units: ["Kilograms", "Grams", "Pounds", "Ounces"],
    convert: (value, from, to) => {
      // Convert to grams first
      const toGrams: { [key: string]: number } = {
        Kilograms: 1000,
        Grams: 1,
        Pounds: 453.592,
        Ounces: 28.3495,
      }
      
      const grams = value * toGrams[from]
      return grams / toGrams[to]
    }
  },
  {
    name: "Temperature",
    units: ["Celsius", "Fahrenheit", "Kelvin"],
    convert: (value, from, to) => {
      // Convert to Celsius first
      let celsius = value
      if (from === "Fahrenheit") {
        celsius = (value - 32) * 5/9
      } else if (from === "Kelvin") {
        celsius = value - 273.15
      }
      
      // Convert from Celsius to target unit
      if (to === "Fahrenheit") {
        return (celsius * 9/5) + 32
      } else if (to === "Kelvin") {
        return celsius + 273.15
      }
      return celsius
    }
  },
  {
    name: "Volume",
    units: ["Liters", "Milliliters", "Gallons", "Fluid Ounces", "Cups"],
    convert: (value, from, to) => {
      // Convert to milliliters first
      const toMilliliters: { [key: string]: number } = {
        Liters: 1000,
        Milliliters: 1,
        Gallons: 3785.41,
        "Fluid Ounces": 29.5735,
        Cups: 236.588,
      }
      
      const ml = value * toMilliliters[from]
      return ml / toMilliliters[to]
    }
  },
  {
    name: "Area",
    units: ["Square Meters", "Square Feet", "Square Inches", "Acres", "Hectares"],
    convert: (value, from, to) => {
      // Convert to square meters first
      const toSquareMeters: { [key: string]: number } = {
        "Square Meters": 1,
        "Square Feet": 0.092903,
        "Square Inches": 0.00064516,
        "Acres": 4046.86,
        "Hectares": 10000,
      }
      
      const sqMeters = value * toSquareMeters[from]
      return sqMeters / toSquareMeters[to]
    }
  },
  {
    name: "Speed",
    units: ["Miles per Hour", "Kilometers per Hour", "Meters per Second", "Knots", "Feet per Second", "Minutes per Kilometer", "Minutes per Mile"],
    convert: (value, from, to) => {
      // Special handling for pace units (time per distance)
      if (from === "Minutes per Kilometer" || from === "Minutes per Mile") {
        // Convert from pace to meters per second first
        let mps = 0
        if (from === "Minutes per Kilometer") {
          mps = 1000 / (value * 60) // Convert min/km to m/s
        } else if (from === "Minutes per Mile") {
          mps = 1609.34 / (value * 60) // Convert min/mile to m/s
        }

        // Convert m/s to target unit
        if (to === "Minutes per Kilometer") {
          return Math.round((1000 / (mps * 60)) * 100) / 100 // Convert m/s to min/km, rounded to 2 decimals
        } else if (to === "Minutes per Mile") {
          return Math.round((1609.34 / (mps * 60)) * 100) / 100 // Convert m/s to min/mile, rounded to 2 decimals
        } else {
          // Convert to regular speed units
          const toMPS: { [key: string]: number } = {
            "Miles per Hour": 0.44704,
            "Kilometers per Hour": 0.277778,
            "Meters per Second": 1,
            "Knots": 0.514444,
            "Feet per Second": 0.3048
          }
          return mps / toMPS[to]
        }
      }
      // Convert regular speed units to meters per second first
      const toMPS: { [key: string]: number } = {
        "Miles per Hour": 0.44704,
        "Kilometers per Hour": 0.277778,
        "Meters per Second": 1,
        "Knots": 0.514444,
        "Feet per Second": 0.3048
      }
      const mps = value * toMPS[from]

      // Convert to target unit
      if (to === "Minutes per Kilometer") {
        return Math.round((1000 / (mps * 60)) * 100) / 100 // Convert m/s to min/km, rounded to 2 decimals
      } else if (to === "Minutes per Mile") {
        return Math.round((1609.34 / (mps * 60)) * 100) / 100 // Convert m/s to min/mile, rounded to 2 decimals
      } else {
        return mps / toMPS[to]
      }
    }
  },
]

export function UnitConverter() {
  const [category, setCategory] = useState(categories[0])
  const [fromUnit, setFromUnit] = useState(category.units[0])
  const [toUnit, setToUnit] = useState(category.units[1])
  const [fromValue, setFromValue] = useState("")
  const [toValue, setToValue] = useState("")

  useEffect(() => {
    // Reset units when category changes
    setFromUnit(category.units[0])
    setToUnit(category.units[1])
    setFromValue("")
    setToValue("")
  }, [category])

  const handleConversion = (value: string, isFromValue: boolean) => {
    if (isFromValue) {
      setFromValue(value)
      const numValue = parseFloat(value) || 0
      const result = category.convert(numValue, fromUnit, toUnit)
      // Special formatting for pace units (minutes per distance)
      if (toUnit === "Minutes per Kilometer" || toUnit === "Minutes per Mile") {
        setToValue(result.toFixed(2))
      } else {
        setToValue(result ? result.toFixed(4) : "")
      }
    } else {
      setToValue(value)
      const numValue = parseFloat(value) || 0
      const result = category.convert(numValue, toUnit, fromUnit)
      // Special formatting for pace units (minutes per distance)
      if (fromUnit === "Minutes per Kilometer" || fromUnit === "Minutes per Mile") {
        setFromValue(result.toFixed(2))
      } else {
        setFromValue(result ? result.toFixed(4) : "")
      }
    }
  }

  return (
    <Card className="p-6 shadow-lg">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <Select 
            value={category.name} 
            onValueChange={(value) => setCategory(categories.find(c => c.name === value) || categories[0])}
          >
            <SelectTrigger>
              <SelectValue>{category.name}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.name} value={cat.name}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Units From</label>
            <Select
              value={fromUnit}
              onValueChange={(value) => {
                setFromUnit(value)
                setFromValue("")
                setToValue("")
              }}
            >
              <SelectTrigger>
                <SelectValue>{fromUnit}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {category.units.map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              value={fromValue}
              onChange={(e) => handleConversion(e.target.value, true)}
              className="text-right"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Units To</label>
            <Select
              value={toUnit}
              onValueChange={(value) => {
                setToUnit(value)
                setFromValue("")
                setToValue("")
              }}
            >
              <SelectTrigger>
                <SelectValue>{toUnit}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {category.units.map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              value={toValue}
              onChange={(e) => handleConversion(e.target.value, false)}
              className="text-right"
            />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((num) => (
            <Button
              key={num}
              variant="outline"
              onClick={() => handleConversion(fromValue + num, true)}
            >
              {num}
            </Button>
          ))}
          <Button
            variant="outline"
            onClick={() => handleConversion(fromValue + ".", true)}
          >
            .
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              setFromValue("")
              setToValue("")
            }}
          >
            C
          </Button>
          <Button
            variant="outline"
            onClick={() => handleConversion(fromValue.slice(0, -1) || "", true)}
          >
            ←
          </Button>
        </div>
      </div>
    </Card>
  )
} 