import { useState } from "react";
import { navigate } from "wouter/use-browser-location";
import { useForm } from "react-hook-form";
import { Users } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { serverAPi } from "@/utils/axios";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await serverAPi.post("/api/user/login", data);
      const result = res.data;
      if (result.status === 1) {
        const accessLevels = result.data?.accessLevels;
        const user = result.data?.userInfo;
        toast?.success(result.message);
        navigate("/");
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("accessLevels", JSON.stringify(accessLevels));
      } else {
        toast?.error(result.message);
      }
    } catch (err) {
      toast?.error(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-primary/10 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
              <Users className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">HR Payroll System</CardTitle>
          <CardDescription>Sign in to manage your workforce</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@company.com"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked)}
                  data-testid="checkbox-remember"
                />
                <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                  Remember me
                </Label>
              </div>
              <Button variant="ghost" className="p-0 h-auto text-sm" data-testid="link-forgot-password">
                Forgot password?
              </Button>
            </div>
            <Button type="submit" className="w-full" size="lg" data-testid="button-login">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
