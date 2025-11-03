import { useState } from "react"
import { BudgetSummary } from "./components/BudgetSummary"
import { Wallet, Receipt, TrendingUp } from "lucide-react"
import { BillsSection } from "./components/BillsSection"
import { IncomeSection } from "./components/IncomeSection"
import { ProjectedExpensesSection } from "./components/ProjectedExpensesSection"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"

export type Income = {
  id: string
  description: string
  amount: number
}

export type Bill = {
  id: string
  description: string
  amount: number
  paid: boolean
}

export type ProjectedExpense = {
  id: string
  description: string
  amount: number
  category: string
}

function App() {
const [incomes, setIncomes] = useState<Income[]>([])
  const [bills, setBills] = useState<Bill[]>([])
  const [projectedExpenses, setProjectedExpenses] = useState<ProjectedExpense[]>([])

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0)
  const totalBills = bills.reduce((sum, bill) => sum + bill.amount, 0)
  const paidBills = bills.filter((bill) => bill.paid).reduce((sum, bill) => sum + bill.amount, 0)
  const unpaidBills = totalBills - paidBills
  const totalProjected = projectedExpenses.reduce((sum, expense) => sum + expense.amount, 0)
  const available = totalIncome - totalBills - totalProjected

  return (
    <>
      <div className="min-h-screen bg-background pb-20">
        <header className="sticky top-0 z-10 bg-primary text-primary-foreground px-4 py-6 shadow-md">
          <h1 className="text-2xl font-bold text-balance">Presupuesto Familiar</h1>
          <p className="text-sm opacity-90 mt-1">Gestiona tus finanzas del mes</p>
        </header>

        <main className="px-4 py-6 max-w-2xl mx-auto space-y-6">
          <BudgetSummary
            totalIncome={totalIncome}
            totalBills={totalBills}
            paidBills={paidBills}
            unpaidBills={unpaidBills}
            totalProjected={totalProjected}
            available={available}
          />

          <Tabs defaultValue="bills" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="bills" className="flex items-center gap-2">
                <Receipt className="h-4 w-4" />
                <span className="hidden sm:inline">Cuentas</span>
              </TabsTrigger>
              <TabsTrigger value="income" className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                <span className="hidden sm:inline">Ingresos</span>
              </TabsTrigger>
              <TabsTrigger value="projected" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Proyectado</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bills" className="mt-6">
              <BillsSection bills={bills} setBills={setBills} />
            </TabsContent>

            <TabsContent value="income" className="mt-6">
              <IncomeSection incomes={incomes} setIncomes={setIncomes} />
            </TabsContent>

            <TabsContent value="projected" className="mt-6">
              <ProjectedExpensesSection
                projectedExpenses={projectedExpenses}
                setProjectedExpenses={setProjectedExpenses}
              />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  )
}

export default App
