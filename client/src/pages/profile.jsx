import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, Building2, Briefcase, Calendar } from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@company.com",
    phone: "+1 234 567 8900",
    role: "Admin",
    department: "Engineering",
    joinDate: "2023-01-15",
    employeeId: "EMP001",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile updated");
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your account information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Avatar className="w-32 h-32">
              <AvatarImage src="" />
              <AvatarFallback className="text-3xl">JD</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold mt-4">{profile.name}</h2>
            <Badge className="mt-2">{profile.role}</Badge>
            <div className="flex flex-col gap-2 mt-4 w-full">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="w-4 h-4" />
                <span>{profile.department}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Joined {profile.joinDate}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Personal Information</CardTitle>
              <Button
                variant={isEditing ? "outline" : "default"}
                onClick={() => setIsEditing(!isEditing)}
                data-testid="button-edit-profile"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="empId">Employee ID</Label>
                  <Input
                    id="empId"
                    value={profile.employeeId}
                    readOnly
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    readOnly={!isEditing}
                    className={!isEditing ? "bg-muted" : ""}
                    data-testid="input-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    readOnly={!isEditing}
                    className={!isEditing ? "bg-muted" : ""}
                    data-testid="input-email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    readOnly={!isEditing}
                    className={!isEditing ? "bg-muted" : ""}
                    data-testid="input-phone"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={profile.role}
                    readOnly
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={profile.department}
                    readOnly
                    className="bg-muted"
                  />
                </div>
              </div>
              {isEditing && (
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="submit" data-testid="button-save">
                    Save Changes
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" data-testid="input-current-password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" data-testid="input-new-password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" data-testid="input-confirm-password" />
            </div>
            <Button type="button" data-testid="button-change-password">
              Change Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
