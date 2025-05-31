import React, { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Copy } from "lucide-react"
import { toast } from "sonner"

export function ScientificCalculator() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [newNumber, setNewNumber] = useState(true)
  const [angleMode, setAngleMode] = useState<"DEG" | "RAD">("DEG")

  // Keyboard mapping
  const keyboardMap: { [key: string]: () => void } = {
    '0': () => handleNumber('0'),
    '1': () => handleNumber('1'),
    '2': () => handleNumber('2'),
    '3': () => handleNumber('3'),
    '4': () => handleNumber('4'),
    '5': () => handleNumber('5'),
    '6': () => handleNumber('6'),
    '7': () => handleNumber('7'),
    '8': () => handleNumber('8'),
    '9': () => handleNumber('9'),
    '.': () => handleNumber('.'),
    '+': () => handleOperation('+'),
    '-': () => handleOperation('-'),
    '*': () => handleOperation('×'),
    '/': () => handleOperation('÷'),
    'Enter': () => handleEqual(),
    '=': () => handleEqual(),
    'Escape': () => handleClear(),
    'c': () => handleClear(),
    'C': () => handleClear(),
    '^': () => handleOperation('^'),
    's': () => handleScientific('sin'),
    'S': () => handleScientific('sin'),
    't': () => handleScientific('tan'),
    'T': () => handleScientific('tan'),
    'o': () => handleScientific('cos'),
    'O': () => handleScientific('cos'),
    'l': () => handleScientific('log'),
    'L': () => handleScientific('ln'),
    'r': () => setAngleMode(angleMode === "DEG" ? "RAD" : "DEG"),
    'R': () => setAngleMode(angleMode === "DEG" ? "RAD" : "DEG"),
    'Backspace': () => handleBackspace(),
  }

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const handler = keyboardMap[event.key]
      if (handler) {
        event.preventDefault()
        handler()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [angleMode, display, operation]) // Dependencies for the keyboard handlers

  const toRadians = (degrees: number) => degrees * (Math.PI / 180)
  const toDegrees = (radians: number) => radians * (180 / Math.PI)

  // Function to handle special angles for more precise results
  const handleSpecialAngle = (angle: number, func: string): number | null => {
    if (angleMode === "DEG") {
      // Normalize angle to 0-360 range
      angle = ((angle % 360) + 360) % 360
      
      // Special angles map for common values
      const specialAngles: { [key: number]: { [key: string]: number } } = {
        0: { sin: 0, cos: 1, tan: 0 },
        30: { sin: 0.5, cos: 0.866025404, tan: 0.577350269 },
        45: { sin: 0.707106781, cos: 0.707106781, tan: 1 },
        60: { sin: 0.866025404, cos: 0.5, tan: 1.732050808 },
        90: { sin: 1, cos: 0, tan: Infinity },
        120: { sin: 0.866025404, cos: -0.5, tan: -1.732050808 },
        135: { sin: 0.707106781, cos: -0.707106781, tan: -1 },
        150: { sin: 0.5, cos: -0.866025404, tan: -0.577350269 },
        180: { sin: 0, cos: -1, tan: 0 },
        210: { sin: -0.5, cos: -0.866025404, tan: 0.577350269 },
        225: { sin: -0.707106781, cos: -0.707106781, tan: 1 },
        240: { sin: -0.866025404, cos: -0.5, tan: 1.732050808 },
        270: { sin: -1, cos: 0, tan: Infinity },
        300: { sin: -0.866025404, cos: 0.5, tan: -1.732050808 },
        315: { sin: -0.707106781, cos: 0.707106781, tan: -1 },
        330: { sin: -0.5, cos: 0.866025404, tan: -0.577350269 },
        360: { sin: 0, cos: 1, tan: 0 }
      }

      // Check if it's a special angle
      if (specialAngles[angle] && specialAngles[angle][func] !== undefined) {
        return specialAngles[angle][func]
      }
    }
    return null
  }

  const formatResult = (result: number): string => {
    if (!isFinite(result)) return result.toString()
    // Round to 8 decimal places and remove trailing zeros
    return Number(result.toFixed(8)).toString()
  }

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num)
      setNewNumber(false)
    } else {
      setDisplay(display === "0" ? num : display + num)
    }
  }

  const handleOperation = (op: string) => {
    setOperation(op)
    setPreviousValue(parseFloat(display))
    setNewNumber(true)
  }

  const handleScientific = (func: string) => {
    const value = parseFloat(display)
    let result: number

    // Check for special angles first
    const specialResult = handleSpecialAngle(value, func)
    if (specialResult !== null) {
      result = specialResult
    } else {
      switch (func) {
        case "sin":
          result = Math.sin(angleMode === "DEG" ? toRadians(value) : value)
          break
        case "cos":
          result = Math.cos(angleMode === "DEG" ? toRadians(value) : value)
          break
        case "tan":
          result = Math.tan(angleMode === "DEG" ? toRadians(value) : value)
          break
        case "asin":
          result = angleMode === "DEG" ? toDegrees(Math.asin(value)) : Math.asin(value)
          break
        case "acos":
          result = angleMode === "DEG" ? toDegrees(Math.acos(value)) : Math.acos(value)
          break
        case "atan":
          result = angleMode === "DEG" ? toDegrees(Math.atan(value)) : Math.atan(value)
          break
        case "sqrt":
          result = Math.sqrt(value)
          break
        case "cbrt":
          result = Math.cbrt(value)
          break
        case "square":
          result = Math.pow(value, 2)
          break
        case "cube":
          result = Math.pow(value, 3)
          break
        case "log":
          result = Math.log10(value)
          break
        case "ln":
          result = Math.log(value)
          break
        case "factorial":
          result = factorial(value)
          break
        case "sinh":
          result = Math.sinh(value)
          break
        case "cosh":
          result = Math.cosh(value)
          break
        case "tanh":
          result = Math.tanh(value)
          break
        case "asinh":
          result = Math.asinh(value)
          break
        case "acosh":
          result = Math.acosh(value)
          break
        case "atanh":
          result = Math.atanh(value)
          break
        case "abs":
          result = Math.abs(value)
          break
        case "random":
          result = Math.random()
          break
        case "toFraction":
          setDisplay(decimalToFraction(value))
          return
        case "toDecimal":
          setDisplay(fractionToDecimal(display).toString())
          return
        default:
          return
      }
    }

    setDisplay(formatResult(result))
    setNewNumber(true)
  }

  const factorial = (n: number): number => {
    if (n < 0) return NaN
    if (n === 0) return 1
    let result = 1
    for (let i = 1; i <= n; i++) result *= i
    return result
  }

  const decimalToFraction = (decimal: number): string => {
    const tolerance = 1.0E-6
    let h1 = 1
    let h2 = 0
    let k1 = 0
    let k2 = 1
    let b = decimal
    do {
      let a = Math.floor(b)
      let aux = h1
      h1 = a * h1 + h2
      h2 = aux
      aux = k1
      k1 = a * k1 + k2
      k2 = aux
      b = 1 / (b - a)
    } while (Math.abs(decimal - h1 / k1) > decimal * tolerance)
    return `${h1}/${k1}`
  }

  const fractionToDecimal = (fraction: string): number => {
    const [numerator, denominator] = fraction.split("/").map(Number)
    return numerator / denominator
  }

  const handleEqual = () => {
    if (previousValue === null || operation === null) return

    const current = parseFloat(display)
    let result = 0

    switch (operation) {
      case "+":
        result = previousValue + current
        break
      case "-":
        result = previousValue - current
        break
      case "×":
        result = previousValue * current
        break
      case "÷":
        result = previousValue / current
        break
      case "^":
        result = Math.pow(previousValue, current)
        break
      case "nPr":
        result = factorial(previousValue) / factorial(previousValue - current)
        break
      case "nCr":
        result = factorial(previousValue) / (factorial(current) * factorial(previousValue - current))
        break
    }

    setDisplay(result.toString())
    setPreviousValue(null)
    setOperation(null)
    setNewNumber(true)
  }

  const handleClear = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
    setNewNumber(true)
  }

  const handleBackspace = () => {
    if (display === "0" || display.length === 1) {
      setDisplay("0")
    } else {
      setDisplay(display.slice(0, -1))
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(display)
      toast.success("Result copied to clipboard!")
    } catch (err) {
      toast.error("Failed to copy result")
    }
  }

  const scientificButtons = [
    [
      { label: "sin", action: () => handleScientific("sin") },
      { label: "cos", action: () => handleScientific("cos") },
      { label: "tan", action: () => handleScientific("tan") },
      { label: angleMode, action: () => setAngleMode(angleMode === "DEG" ? "RAD" : "DEG") },
    ],
    [
      { label: "asin", action: () => handleScientific("asin") },
      { label: "acos", action: () => handleScientific("acos") },
      { label: "atan", action: () => handleScientific("atan") },
      { label: "π", action: () => handleNumber(Math.PI.toString()) },
    ],
    [
      { label: "√", action: () => handleScientific("sqrt") },
      { label: "∛", action: () => handleScientific("cbrt") },
      { label: "x²", action: () => handleScientific("square") },
      { label: "e", action: () => handleNumber(Math.E.toString()) },
    ],
    [
      { label: "x³", action: () => handleScientific("cube") },
      { label: "xⁿ", action: () => handleOperation("^") },
      { label: "log", action: () => handleScientific("log") },
      { label: "ln", action: () => handleScientific("ln") },
    ],
    [
      { label: "n!", action: () => handleScientific("factorial") },
      { label: "nPr", action: () => handleOperation("nPr") },
      { label: "nCr", action: () => handleOperation("nCr") },
      { label: "|x|", action: () => handleScientific("abs") },
    ],
    [
      { label: "sinh", action: () => handleScientific("sinh") },
      { label: "cosh", action: () => handleScientific("cosh") },
      { label: "tanh", action: () => handleScientific("tanh") },
      { label: "RND", action: () => handleScientific("random") },
    ],
    [
      { label: "asinh", action: () => handleScientific("asinh") },
      { label: "acosh", action: () => handleScientific("acosh") },
      { label: "atanh", action: () => handleScientific("atanh") },
      { label: "⟷", action: () => display.includes("/") ? handleScientific("toDecimal") : handleScientific("toFraction") },
    ],
  ]

  const basicButtons = [
    ["7", "8", "9", "÷"],
    ["4", "5", "6", "×"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
  ]

  const getFontSize = (value: string) => {
    if (value.length > 20) return "text-xl"
    if (value.length > 15) return "text-2xl"
    if (value.length > 10) return "text-3xl"
    return "text-4xl"
  }

  return (
    <Card className="p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-medium">Mode: {angleMode}</div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAngleMode(angleMode === "DEG" ? "RAD" : "DEG")}
          className={`${angleMode === "DEG" ? "bg-primary text-primary-foreground" : ""}`}
        >
          {angleMode === "DEG" ? "DEG → RAD" : "RAD → DEG"}
        </Button>
      </div>
      <div className="mb-4 p-4 bg-secondary text-secondary-foreground rounded-lg h-20 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-8 w-8 p-0"
          title="Copy result"
        >
          <Copy className="h-4 w-4" />
        </Button>
        <div className={`font-mono truncate ${getFontSize(display)}`}>
          {display}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex gap-2">
          <Button
            variant="destructive"
            className="flex-1"
            onClick={handleClear}
          >
            Clear
          </Button>
          <Button
            variant="secondary"
            onClick={handleBackspace}
            className="w-16"
          >
            ←
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {scientificButtons.map((row, i) =>
            row.map((btn, j) => (
              <Button
                key={`sci-${i}-${j}`}
                variant="secondary"
                className={btn.label === operation ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
                onClick={btn.action}
                size="sm"
              >
                {btn.label === angleMode ? (
                  <div className="flex flex-col items-center text-xs">
                    <span>{angleMode}</span>
                    <span className="text-[10px]">{angleMode === "DEG" ? "→ RAD" : "→ DEG"}</span>
                  </div>
                ) : (
                  btn.label
                )}
              </Button>
            ))
          )}
          {basicButtons.map((row, i) =>
            row.map((btn, j) => {
              const isOperator = ["÷", "×", "-", "+"].includes(btn)
              const isActiveOperator = isOperator && operation === btn
              return (
                <Button
                  key={`basic-${i}-${j}`}
                  variant={isOperator ? "secondary" : "default"}
                  className={isActiveOperator ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
                  onClick={() => {
                    if (btn === "=") handleEqual()
                    else if (isOperator) handleOperation(btn)
                    else handleNumber(btn)
                  }}
                >
                  {btn}
                </Button>
              )
            })
          )}
        </div>
      </div>
    </Card>
  )
} 