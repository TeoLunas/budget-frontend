
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from "lucide-react"
import type { Income } from "@/App"

type IncomeSectionProps = {
    incomes: Income[]
    setIncomes: (incomes: Income[]) => void
}

export const IncomeSection = ({ incomes, setIncomes }: IncomeSectionProps) => {
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState("")

    const addIncome = () => {
        if (description && amount) {
            const newIncome: Income = {
                id: Date.now().toString(),
                description,
                amount: Number.parseFloat(amount),
            }
            setIncomes([...incomes, newIncome])
            setDescription("")
            setAmount("")
        }
    }

    const deleteIncome = (id: string) => {
        setIncomes(incomes.filter((income) => income.id !== id))
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("es-CL", {
            style: "currency",
            currency: "CLP",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount)
    }

    return (
        <div className="space-y-4">
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg">Agregar Ingreso</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="income-description">Descripción</Label>
                        <Input
                            id="income-description"
                            placeholder="Ej: Salario, Freelance..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="income-amount">Monto</Label>
                        <Input
                            id="income-amount"
                            type="number"
                            placeholder="0"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <Button onClick={addIncome} className="w-full" size="lg">
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar Ingreso
                    </Button>
                </CardContent>
            </Card>

            {incomes.length > 0 && (
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg">Ingresos del Mes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {incomes.map((income) => (
                                <div key={income.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                                    <div className="flex-1">
                                        <p className="font-medium">{income.description}</p>
                                        <p className="text-lg font-bold text-primary mt-1">{formatCurrency(income.amount)}</p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => deleteIncome(income.id)}
                                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
