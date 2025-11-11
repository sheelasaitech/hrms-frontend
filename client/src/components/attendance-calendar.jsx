import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export function AttendanceCalendar({ month, year, attendance }) {
  const daysInMonth = new Date(year, new Date(Date.parse(month + " 1, " + year)).getMonth() + 1, 0).getDate();
  const firstDay = new Date(year, new Date(Date.parse(month + " 1, " + year)).getMonth(), 1).getDay();

  const statusColors = {
    Present: "bg-green-500/20 text-green-700 dark:text-green-400",
    Absent: "bg-red-500/20 text-red-700 dark:text-red-400",
    Leave: "bg-gray-500/20 text-gray-700 dark:text-gray-400",
    "Half-day": "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400",
    Remote: "bg-blue-500/20 text-blue-700 dark:text-blue-400",
  };

  const getAttendanceStatus = (day) => {
    const dateStr = `${year}-${String(new Date(Date.parse(month + " 1, " + year)).getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return attendance.find((a) => a.date === dateStr)?.status;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {month} {year} Attendance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-sm font-semibold text-muted-foreground py-2">
              {day}
            </div>
          ))}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const status = getAttendanceStatus(day);
            return (
              <div
                key={day}
                className={`aspect-square flex items-center justify-center rounded-lg border border-border ${
                  status ? statusColors[status] : "hover-elevate"
                }`}
                data-testid={`day-${day}`}
              >
                <span className="text-sm font-medium">{day}</span>
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-2 mt-6">
          {Object.entries(statusColors).map(([status, color]) => (
            <div key={status} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded ${color}`} />
              <span className="text-xs text-muted-foreground">{status}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
