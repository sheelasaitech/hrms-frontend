import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "lucide-react";

export function ProjectKanban({ projects }) {
  const columns = [
    { status: "Assigned", projects: projects.filter((p) => p.status === "Assigned") },
    { status: "In Progress", projects: projects.filter((p) => p.status === "In Progress") },
    { status: "Completed", projects: projects.filter((p) => p.status === "Completed") },
  ];

  const getProgressColor = (progress, dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const daysUntilDue = Math.floor((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (progress === 100) return "hsl(var(--chart-1))";
    if (daysUntilDue < 0) return "hsl(var(--destructive))";
    if (daysUntilDue < 7) return "hsl(var(--chart-3))";
    return "hsl(var(--primary))";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map((column) => (
        <div key={column.status} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">{column.status}</h3>
            <Badge variant="secondary">{column.projects.length}</Badge>
          </div>
          <div className="space-y-3">
            {column.projects.map((project) => (
              <Card key={project.id} className="hover-elevate" data-testid={`card-project-${project.id}`}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{project.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {project.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                  )}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress
                      value={project.progress}
                      className="h-2"
                      style={{
                        ["--progress-background"]: getProgressColor(project.progress, project.dueDate),
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
                  </div>
                  {project.assignedNames.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.assignedNames.map((name, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {name}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
