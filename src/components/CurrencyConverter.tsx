import React, { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Input } from "./ui/input"
import { Copy } from "lucide-react"
import { toast } from "sonner"
import { Skeleton } from "./ui/skeleton"

type Currency = {
  code: string
  name: string
  symbol: string
}

const commonCurrencies: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$" },
]

export function CurrencyConverter() {
  const [amount, setAmount] = useState("1")
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [exchangeRate, setExchangeRate] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchExchangeRate = async () => {
    try {
      setLoading(true)
      // Using the free version of ExchangeRate-API
      const response = await fetch(
        `https://open.er-api.com/v6/latest/${fromCurrency}`
      )
      const data = await response.json()
      
      if (data.rates) {
        setExchangeRate(data.rates[toCurrency])
        setLastUpdated(new Date())
      } else {
        toast.error("Failed to fetch exchange rate")
      }
    } catch (error) {
      toast.error("Error fetching exchange rate")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExchangeRate()
  }, [fromCurrency, toCurrency])

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const copyToClipboard = async () => {
    if (!exchangeRate) return
    
    try {
      const result = (parseFloat(amount) * exchangeRate).toFixed(2)
      await navigator.clipboard.writeText(result)
      toast.success("Result copied to clipboard!")
    } catch (err) {
      toast.error("Failed to copy result")
    }
  }

  const formatResult = () => {
    if (!exchangeRate) return "..."
    const result = (parseFloat(amount) * exchangeRate).toFixed(2)
    const toCurrencyInfo = commonCurrencies.find(c => c.code === toCurrency)
    return `${toCurrencyInfo?.symbol || ""}${result}`
  }

  return (
    <Card className="p-6 shadow-lg">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium">Amount</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-right"
            />
          </div>
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium">From</label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {commonCurrencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleSwapCurrencies}
            className="mt-8"
          >
            ⇄
          </Button>
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium">To</label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {commonCurrencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-secondary text-secondary-foreground rounded-lg p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={copyToClipboard}
              className="h-8 w-8 p-0"
              title="Copy result"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <div className="text-2xl font-mono">
              {loading ? <Skeleton className="h-8 w-32" /> : formatResult()}
            </div>
          </div>
          {lastUpdated && (
            <div className="text-xs text-muted-foreground mt-2 text-right">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          )}
        </div>

        <div className="text-sm text-muted-foreground">
          {exchangeRate && (
            <div className="text-center">
              1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
} 