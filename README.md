# CalcPro - Advanced Calculator Suite

A comprehensive calculator web application built with React, TypeScript, and Tailwind CSS, featuring multiple calculation modes, real-time unit conversions, and a modern user interface.

Currently deployed to https://calculatorpro.xyz/.

## ✨ Features

### 🧮 Multiple Calculator Modes
- **Simple Calculator**
  - Basic arithmetic operations
  - Keyboard input support
  - Copy results to clipboard
  - Clean, intuitive interface

- **Scientific Calculator**
  - Trigonometric functions (sin, cos, tan)
  - Inverse trigonometric functions
  - Exponential and logarithmic functions
  - Degree/Radian mode switching
  - Special constants (π, e)
  - Memory functions
  - Keyboard shortcuts

- **Unit Converter**
  - Length (m, km, mi, ft, in, cm)
  - Weight (kg, g, lb, oz)
  - Temperature (°C, °F, K)
  - Volume (L, mL, gal, fl oz, cups)
  - Area (m², ft², in², acres, hectares)
  - Speed (mph, km/h, m/s, knots, ft/s, min/km, min/mi)
  - Real-time bidirectional conversion

- **Currency Converter**
  - Real-time exchange rates
  - 12+ major currencies supported
  - Quick currency swapping
  - Last updated timestamp
  - Copy converted amounts

### 🎨 User Interface
- Dark/Light theme support
- Responsive design for all devices
- Smooth animations and transitions
- Modern, clean aesthetic
- Accessible keyboard navigation

### ⌨️ Keyboard Support
- Number input (0-9)
- Basic operators (+, -, *, /)
- Enter for equals
- Escape for clear
- Backspace for deletion
- Scientific function shortcuts
- Theme toggle shortcut

### 📋 Clipboard Integration
- Copy results with one click
- Success/error notifications
- Keyboard shortcut support (Ctrl/Cmd + C)

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Hooks
- **Build Tool**: Vite
- **Theme Management**: next-themes
- **Icons**: Lucide React
- **Notifications**: Sonner
- **HTTP Client**: Native fetch API

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd calculator
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Add your API keys for currency conversion
```

4. Start the development server:
```bash
npm run dev
```

## 🚀 Usage

### Simple Calculator
- Use number pad or keyboard for input
- Basic arithmetic operations
- Copy results with the copy button
- Clear with 'C' or Escape key

### Scientific Calculator
- Switch between DEG/RAD modes
- Access advanced functions:
  - Trigonometric: sin, cos, tan
  - Inverse trig: asin, acos, atan
  - Powers: x², x³, xⁿ
  - Roots: √, ∛
  - Logarithms: log, ln
  - Constants: π, e

### Unit Converter
- Select source and target units
- Enter value for instant conversion
- Switch between different unit categories
- Copy converted values

### Currency Converter
- Select source and target currencies
- Enter amount to convert
- View real-time exchange rates
- Use swap button to reverse conversion
- See last updated timestamp

### Keyboard Shortcuts
- Numbers: 0-9
- Operators: +, -, *, /
- Equals: Enter
- Clear: Escape or C
- Delete: Backspace
- Scientific Mode:
  - 's': sin
  - 'c': cos
  - 't': tan
  - 'l': log
  - 'r': toggle RAD/DEG

## 🔧 Configuration

### Currency API Setup
1. Sign up for an API key at your preferred provider:
   - [ExchangeRate-API](https://www.exchangerate-api.com/)
   - [Fixer.io](https://fixer.io/)
   - [Open Exchange Rates](https://openexchangerates.org/)

2. Add your API key to .env:
```env
VITE_EXCHANGE_RATE_API_KEY=your_api_key_here
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details. 