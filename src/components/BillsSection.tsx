import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, CheckCircle2, Circle } from "lucide-react"
import type { Bill } from "@/App"

type BillsSectionProps = {
    bills: Bill[]
    setBills: (bills: Bill[]) => void
}

export const BillsSection = ({ bills, setBills }: BillsSectionProps) => {
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState("")

    const addBill = () => {
        if (description && amount) {
            const newBill: Bill = {
                id: Date.now().toString(),
                description,
                amount: Number.parseFloat(amount),
                paid: false,
            }
            setBills([...bills, newBill])
            setDescription("")
            setAmount("")
        }
    }

    const togglePaid = (id: string) => {
        setBills(bills.map((bill) => (bill.id === id ? { ...bill, paid: !bill.paid } : bill)))
    }

    const deleteBill = (id: string) => {
        setBills(bills.filter((bill) => bill.id !== id))
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
                    <CardTitle className="text-lg">Agregar Cuenta</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="bill-description">Descripción</Label>
                        <Input
                            id="bill-description"
                            placeholder="Ej: Luz, Agua, Internet..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="bill-amount">Monto</Label>
                        <Input
                            id="bill-amount"
                            type="number"
                            placeholder="0"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <Button onClick={addBill} className="w-full" size="lg">
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar Cuenta
                    </Button>
                </CardContent>
            </Card>

            {bills.length > 0 && (
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg">Cuentas por Pagar</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {bills.map((bill) => (
                                <div key={bill.id} className="flex items-start gap-3 p-4 rounded-lg border-2 bg-card transition-colors">
                                    <button
                                        onClick={() => togglePaid(bill.id)}
                                        className="mt-0.5 text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {bill.paid ? <CheckCircle2 className="h-6 w-6 text-primary" /> : <Circle className="h-6 w-6" />}
                                    </button>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                            <p className={`font-medium ${bill.paid ? "line-through text-muted-foreground" : ""}`}>
                                                {bill.description}
                                            </p>
                                            <Badge variant={bill.paid ? "default" : "secondary"} className="shrink-0">
                                                {bill.paid ? "Pagado" : "Pendiente"}
                                            </Badge>
                                        </div>
                                        <p className={`text-lg font-bold ${bill.paid ? "text-primary" : "text-destructive"}`}>
                                            {formatCurrency(bill.amount)}
                                        </p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => deleteBill(bill.id)}
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
