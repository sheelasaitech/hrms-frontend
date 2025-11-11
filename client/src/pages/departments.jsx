import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function DepartmentsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const departments = [
    { id: "1", name: "Engineering", description: "Software development and IT infrastructure", count: 45 },
    { id: "2", name: "Sales", description: "Sales and business development", count: 28 },
    { id: "3", name: "Marketing", description: "Marketing and brand management", count: 22 },
    { id: "4", name: "Human Resources", description: "HR and employee management", count: 15 },
    { id: "5", name: "Operations", description: "Operations and logistics", count: 35 },
    { id: "6", name: "Finance", description: "Finance and accounting", count: 11 },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Add department form submitted");
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Departments</h1>
          <p className="text-muted-foreground mt-1">Manage organizational departments</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-department">
              <Plus className="w-4 h-4 mr-2" />
              Add Department
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Department</DialogTitle>
              <DialogDescription>Create a new department in your organization.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="deptName">Department Name</Label>
                <Input id="deptName" required data-testid="input-department-name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deptDescription">Description</Label>
                <Textarea id="deptDescription" rows={3} data-testid="textarea-description" />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" data-testid="button-submit">Add Department</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <Card key={dept.id} className="hover-elevate" data-testid={`card-department-${dept.id}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle>{dept.name}</CardTitle>
                <Badge variant="secondary">{dept.count} employees</Badge>
              </div>
              <CardDescription className="line-clamp-2">{dept.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" className="w-full" data-testid={`button-edit-department-${dept.id}`}>
                Edit Department
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
