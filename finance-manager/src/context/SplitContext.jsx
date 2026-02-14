import { createContext, useContext, useState, useMemo } from "react"

const SplitContext = createContext()

export const SplitProvider = ({ children }) => {


  const defaultParticipants = [
    {
      id: "p1",
      name: "Abhi",
      totalPaid: 0,
      totalShare: 0,
      balance: 0,
    },
    {
      id: "p2",
      name: "Rahul",
      totalPaid: 0,
      totalShare: 0,
      balance: 0,
    },
    {
      id: "p3",
      name: "Aman",
      totalPaid: 0,
      totalShare: 0,
      balance: 0,
    },
  ]

  const [participants, setParticipants] = useState(defaultParticipants)
  const [expenses, setExpenses] = useState([])


  const addParticipant = (name) => {
    const newParticipant = {
      id: `p${Date.now()}`,
      name,
      totalPaid: 0,
      totalShare: 0,
      balance: 0,
    }

    setParticipants((prev) => [...prev, newParticipant])
  }


  const addExpense = ({
    description,
    amount,
    paidBy,
    participants: selectedParticipants,
    splitType = "equal",
  }) => {
    const newExpense = {
      id: `e${Date.now()}`,
      description,
      amount: Number(amount),
      paidBy,
      participants: selectedParticipants,
      splitType,
      createdAt: new Date(),
    }

    setExpenses((prev) => [...prev, newExpense])
  }


  const calculateBalances = () => {
    const updatedParticipants = participants.map((p) => ({
      ...p,
      totalPaid: 0,
      totalShare: 0,
      balance: 0,
    }))

    expenses.forEach((expense) => {
      const splitAmount =
        expense.splitType === "equal"
          ? expense.amount / expense.participants.length
          : 0

      expense.participants.forEach((participantId) => {
        const participant = updatedParticipants.find(
          (p) => p.id === participantId
        )

        if (participant) {
          participant.totalShare += splitAmount
        }
      })

      const payer = updatedParticipants.find(
        (p) => p.id === expense.paidBy
      )

      if (payer) {
        payer.totalPaid += expense.amount
      }
    })

    updatedParticipants.forEach((p) => {
      p.balance = p.totalPaid - p.totalShare
    })

    return updatedParticipants
  }

  const balancedParticipants = useMemo(() => {
    return calculateBalances()
  }, [participants, expenses])

  return (
    <SplitContext.Provider
      value={{
        participants: balancedParticipants,
        expenses,
        addParticipant,
        addExpense,
      }}
    >
      {children}
    </SplitContext.Provider>
  )
}

export const useSplit = () => useContext(SplitContext)
