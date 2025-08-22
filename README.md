// Mantemos o código da aplicação como está e agora adicionamos os arquivos auxiliares:

// 📄 README.md
/*
# 📦 USPS Shipping Label Generator

This project is a take-home challenge to build a web application that generates and prints USPS shipping labels using the [EasyPost API](https://www.easypost.com/).

---

## 🚀 Quickstart

```bash
# Install dependencies
pnpm install

# Create .env.local file and add your EasyPost key
cp .env.example .env.local

# Start development server
pnpm dev
```

Open http://localhost:3000/label-generator

---

## ✅ Features

- ✅ Built with **Next.js 14 App Router**, React 18 and TypeScript
- ✅ Validated form using **react-hook-form + Zod**
- ✅ Uses **React Query** for mutation and state handling
- ✅ **Composition pattern** for inputs and layouts
- ✅ Custom API route for secure EasyPost access (avoids CORS)
- ✅ TailwindCSS for utility-first styling
- ✅ Toast feedback with `react-toastify`
- ✅ **Fully tested** with `@testing-library/react` + Jest

---

## 📬 Assumptions

- Only addresses from the United States are accepted
- Only one rate/label is selected (the first USPS one returned)
- Only one label is created at a time
- Sandbox mode is used (no real labels are charged)

---

## 💡 What I'd do with more time

- Add unit tests for API errors and success mocks
- Add i18n (internationalization support)
- Create success/failure views with icons
- Style the layout responsively for mobile
- Add loading skeleton or animation for label preview
- Handle multiple rates and allow user selection

---

## 📁 Project Structure (Highlights)

```
src/
├─ app/label-generator           # Page and layout
├─ app/api/shipments             # API route to EasyPost
├─ components/ui                 # Composable input components
├─ features/label/api            # Local hook for createShipment()
├─ styles/                       # Tailwind setup
```

---

## 🔐 Environment Variables

Add your EasyPost key to `.env.local`:

```env
EASYPOST_API_KEY=EASYPOST_API_KEY_HERE
```
*/


// 📄 .env.example
/*
# EasyPost Sandbox Key
EASYPOST_API_KEY=EASYPOST_API_KEY_HERE
*/
