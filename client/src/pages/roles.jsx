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

export default function RolesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const roles = [
    { id: "1", name: "Admin", description: "Full system access and management", count: 5 },
    { id: "2", name: "HR", description: "Human resources management", count: 8 },
    { id: "3", name: "Manager", description: "Team and project management", count: 22 },
    { id: "4", name: "Staff", description: "Regular employee", count: 121 },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Add role form submitted");
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Roles</h1>
          <p className="text-muted-foreground mt-1">Manage employee roles and permissions</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-role">
              <Plus className="w-4 h-4 mr-2" />
              Add Role
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Role</DialogTitle>
              <DialogDescription>Create a new role with specific permissions.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="roleName">Role Name</Label>
                <Input id="roleName" required data-testid="input-role-name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roleDescription">Description</Label>
                <Textarea id="roleDescription" rows={3} data-testid="textarea-description" />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" data-testid="button-submit">Add Role</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {roles.map((role) => (
          <Card key={role.id} className="hover-elevate" data-testid={`card-role-${role.id}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle>{role.name}</CardTitle>
                <Badge variant="secondary">{role.count}</Badge>
              </div>
              <CardDescription className="line-clamp-2">{role.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" className="w-full" data-testid={`button-edit-role-${role.id}`}>
                Edit Role
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
