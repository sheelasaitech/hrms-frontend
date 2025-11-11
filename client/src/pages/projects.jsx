import { ProjectKanban } from "@/components/project-kanban";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ProjectsPage() {
  const projects = [
    {
      id: "1",
      name: "Website Redesign",
      description: "Complete overhaul of company website with modern UI/UX",
      status: "In Progress",
      progress: 65,
      dueDate: "2025-11-15",
      assignedTo: ["emp1", "emp2"],
      assignedNames: ["Sarah J.", "Mike C."],
    },
    {
      id: "2",
      name: "Mobile App Development",
      description: "New mobile app for customer engagement",
      status: "Assigned",
      progress: 20,
      dueDate: "2025-12-01",
      assignedTo: ["emp3"],
      assignedNames: ["Alex P."],
    },
    {
      id: "3",
      name: "Q4 Marketing Campaign",
      description: "Social media and email marketing campaign",
      status: "Completed",
      progress: 100,
      dueDate: "2025-10-20",
      assignedTo: ["emp4"],
      assignedNames: ["Emily R."],
    },
    {
      id: "4",
      name: "CRM Integration",
      description: "Integrate new CRM system with existing tools",
      status: "In Progress",
      progress: 45,
      dueDate: "2025-10-28",
      assignedTo: ["emp1", "emp3"],
      assignedNames: ["Sarah J.", "Alex P."],
    },
    {
      id: "5",
      name: "Data Migration",
      description: "Migrate legacy data to new cloud infrastructure",
      status: "Assigned",
      progress: 10,
      dueDate: "2025-11-30",
      assignedTo: ["emp2"],
      assignedNames: ["Mike C."],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Project Management</h1>
          <p className="text-muted-foreground mt-1">Track project progress and team assignments</p>
        </div>
        <Button data-testid="button-add-project">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      <ProjectKanban projects={projects} />
    </div>
  );
}
