import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpCircle, ArrowDownCircle, DollarSign } from "lucide-react"

type BudgetSummaryProps = {
    totalIncome: number
    totalBills: number
    paidBills: number
    unpaidBills: number
    totalProjected: number
    available: number
}

export const BudgetSummary = ({
    totalIncome,
    totalBills,
    paidBills,
    unpaidBills,
    totalProjected,
    available,
}: BudgetSummaryProps) => {
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
            <Card className="bg-primary text-primary-foreground border-0 shadow-lg">
                <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm opacity-90">Disponible</p>
                            <p className="text-3xl font-bold mt-1">{formatCurrency(available)}</p>
                        </div>
                        <DollarSign className="h-12 w-12 opacity-80" />
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
                <Card className="shadow-sm">
                    <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 text-primary mb-2">
                                    <ArrowUpCircle className="h-5 w-5" />
                                    <p className="text-sm font-medium">Ingresos</p>
                                </div>
                                <p className="text-2xl font-bold">{formatCurrency(totalIncome)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm">
                    <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 text-destructive mb-2">
                                    <ArrowDownCircle className="h-5 w-5" />
                                    <p className="text-sm font-medium">Gastos</p>
                                </div>
                                <p className="text-2xl font-bold">{formatCurrency(totalBills + totalProjected)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="shadow-sm">
                <CardContent className="pt-6">
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Cuentas pagadas</span>
                            <span className="font-semibold text-primary">{formatCurrency(paidBills)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Cuentas pendientes</span>
                            <span className="font-semibold text-destructive">{formatCurrency(unpaidBills)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Gastos proyectados</span>
                            <span className="font-semibold">{formatCurrency(totalProjected)}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
