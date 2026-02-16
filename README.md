# 💰 SplitWise – Personal Expense Split Manager

A modern expense splitting web application built with **React + Context API + Tailwind CSS** that helps friends track shared expenses and calculate balances automatically.

---

## 🚀 Live Demo

👉 [Hosted Link](https://personal-finance-split-manager.vercel.app/)

---

## 📌 Problem Statement

When friends share expenses (trips, dinners, rent, etc.), tracking who owes whom becomes confusing.

This app solves that problem by:

- Recording shared expenses
- Splitting costs equally
- Calculating real-time balances
- Showing a clear financial summary

---

## 🛠️ Tech Stack

- **React.js**
- **React Context API** (Global State Management)
- **React Router**
- **Tailwind CSS**
- **Lucide React Icons**
- **Radix UI (Dropdown Menu)**

---

## 🧠 Core Features

### 👥 Participants Management
- Predefined participants
- Add new participants dynamically
- Real-time balance calculation

### 💸 Expense Management
- Add expense
- Edit expense
- Delete expense
- Automatic recalculation of balances

### 📊 History Page
- Total expenses summary
- Total paid
- Total share
- Net balance
- Expense list sorted by date

### 🧭 Navigation
- Dashboard
- History
- Profile dropdown

---

## Screenshots 
<img width="1080" height="720" alt="Image" src="https://github.com/user-attachments/assets/c66424f0-7a36-4d44-a437-b850c2750467" />

<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/5702df9d-cf5b-4141-882c-e5c9a8e9c8e7" />

<img width="901" height="546" alt="Image" src="https://github.com/user-attachments/assets/ce4c1ec0-4910-450a-a4ef-f67c9b356836" />

# 🧮 How the Calculations Work

The core logic of this application is the balance calculation system inside the `SplitContext`.

---

## 1️ Data Structure

Each participant:

```js
{
  id: "p1",
  name: "Abhi",
  totalPaid: 0,
  totalShare: 0,
  balance: 0
}

```
Expense example:

```js
{
  id: "e1",
  description: "Dinner",
  amount: 1200,
  paidBy: "p1",
  participants: ["p1", "p2", "p3"],
  splitType: "equal",
  createdAt: Date
}
```

## 2 Calculation logic

### Step 1 – Reset All Values
```js
totalPaid = 0
totalShare = 0
balance = 0
```
### Step 2 – Split Each Expense
```js
splitAmount = expense.amount / expense.participants.length
totalShare += splitAmount

```
### Step 3 - Add to Payer’s Total
```js
payer.totalPaid += expense.amount

```
### Step 4 – Final Balance Formula
```js
balance = totalPaid - totalShare
```
### Step 5 - Use useMemo
```js
const balancedParticipants = useMemo(() => {
  return calculateBalances()
}, [participants, expenses])
```
This ensures:
- Recalculation happens only when dependencies change
- Optimized performance
- Prevents unnecessary re-renders

## 📁 Project Structure

```css
src/
│
├── components/
│   ├── Navbar.jsx
│   ├── AddExpenseModal.jsx
│
├── context/
│   └── SplitContext.jsx
│
├── pages/
│   ├── Dashboard.jsx
│   └── History.jsx
│
├── App.jsx
└── main.jsx
```

## 🏗️ How to Run Locally

```bash
git clone https://github.com/abhikainthla/Personal-Finance-Split-Manager.git

cd finance-manager

npm install

npm run dev
```

## 🌟 Future Improvements

- Custom split percentages
- Settlement simplification (who should pay whom)
- Charts & analytics
- Export to PDF
- Authentication system
- Backend integration

