
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Tag } from "lucide-react"
import type { ProjectedExpense } from "@/App"

type ProjectedExpensesSectionProps = {
    projectedExpenses: ProjectedExpense[]
    setProjectedExpenses: (expenses: ProjectedExpense[]) => void
}

const categories = ["Alimentación", "Transporte", "Entretenimiento", "Salud", "Educación", "Otros"]

export const ProjectedExpensesSection = ({ projectedExpenses, setProjectedExpenses }: ProjectedExpensesSectionProps) => {
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState("")
    const [category, setCategory] = useState("")

    const addExpense = () => {
        if (description && amount && category) {
            const newExpense: ProjectedExpense = {
                id: Date.now().toString(),
                description,
                amount: Number.parseFloat(amount),
                category,
            }
            setProjectedExpenses([...projectedExpenses, newExpense])
            setDescription("")
            setAmount("")
            setCategory("")
        }
    }

    const deleteExpense = (id: string) => {
        setProjectedExpenses(projectedExpenses.filter((expense) => expense.id !== id))
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("es-CL", {
            style: "currency",
            currency: "CLP",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount)
    }

    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            Alimentación: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
            Transporte: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
            Entretenimiento: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
            Salud: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
            Educación: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
            Otros: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
        }
        return colors[category] || colors.Otros
    }

    return (
        <div className="space-y-4">
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg">Agregar Gasto Proyectado</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="expense-description">Descripción</Label>
                        <Input
                            id="expense-description"
                            placeholder="Ej: Compras del mes, Gasolina..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="expense-amount">Monto</Label>
                            <Input
                                id="expense-amount"
                                type="number"
                                placeholder="0"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="expense-category">Categoría</Label>
                            <Select value={category} onValueChange={setCategory}>
                                <SelectTrigger id="expense-category">
                                    <SelectValue placeholder="Seleccionar" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat} value={cat}>
                                            {cat}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Button onClick={addExpense} className="w-full" size="lg">
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar Gasto
                    </Button>
                </CardContent>
            </Card>

            {projectedExpenses.length > 0 && (
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg">Gastos Proyectados</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {projectedExpenses.map((expense) => (
                                <div key={expense.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span
                                                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                                                    expense.category,
                                                )}`}
                                            >
                                                <Tag className="h-3 w-3" />
                                                {expense.category}
                                            </span>
                                        </div>
                                        <p className="font-medium">{expense.description}</p>
                                        <p className="text-lg font-bold mt-1">{formatCurrency(expense.amount)}</p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => deleteExpense(expense.id)}
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
