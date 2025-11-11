import { Card, CardContent } from "@/components/ui/card";

export function KPICard({ title, value, icon: Icon, trend }) {
  return (
    <Card className="hover-elevate">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-3xl font-bold mt-2" data-testid={`kpi-${title.toLowerCase().replace(/\s+/g, "-")}`}>
              {value}
            </h3>
            {trend && (
              <p className={`text-xs mt-2 ${trend.isPositive ? "text-green-600" : "text-red-600"}`}>
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}% from last month
              </p>
            )}
          </div>
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
