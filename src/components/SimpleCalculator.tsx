import React, { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Copy } from "lucide-react"
import { toast } from "sonner"
import { logEvent } from "../lib/analytics"

export function SimpleCalculator() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [newNumber, setNewNumber] = useState(true)

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
  }, [display, operation]) // Dependencies for the keyboard handlers

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
      logEvent('Calculator', 'Copy', 'Copy result to clipboard')
    } catch (err) {
      toast.error("Failed to copy result")
    }
  }

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num)
      setNewNumber(false)
    } else {
      setDisplay(display === "0" ? num : display + num)
    }
    logEvent('Calculator', 'Number Input', num)
  }

  const handleOperation = (op: string) => {
    setOperation(op)
    setPreviousValue(parseFloat(display))
    setNewNumber(true)
    logEvent('Calculator', 'Operation', op)
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
    }

    setDisplay(result.toString())
    setPreviousValue(null)
    setOperation(null)
    setNewNumber(true)
    logEvent('Calculator', 'Calculate', `${previousValue} ${operation} ${current} = ${result}`)
  }

  const handleClear = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
    setNewNumber(true)
    logEvent('Calculator', 'Clear', 'Clear calculator')
  }

  const buttons = [
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
          {buttons.map((row, i) =>
            row.map((btn, j) => {
              const isOperator = ["÷", "×", "-", "+"].includes(btn)
              const isActiveOperator = isOperator && operation === btn
              return (
                <Button
                  key={`${i}-${j}`}
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