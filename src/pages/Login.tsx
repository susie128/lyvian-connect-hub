import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LyvianLogo from "@/components/LyvianLogo";
import { Phone, Mail, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"mobile" | "email">("mobile");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock: navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="mb-8 flex justify-center">
          <LyvianLogo size="lg" />
        </div>

        <Card className="border-border/50 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-semibold">Welcome back</CardTitle>
            <CardDescription>Sign in to your Lyvian account</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={loginMethod} onValueChange={(v) => setLoginMethod(v as "mobile" | "email")}>
              <TabsList className="mb-6 grid w-full grid-cols-2">
                <TabsTrigger value="mobile" className="gap-1.5">
                  <Phone size={14} /> Mobile
                </TabsTrigger>
                <TabsTrigger value="email" className="gap-1.5">
                  <Mail size={14} /> Email
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleLogin} className="space-y-4">
                <TabsContent value="mobile" className="mt-0 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <Input id="mobile" type="tel" placeholder="+1 (555) 000-0000" />
                  </div>
                </TabsContent>

                <TabsContent value="email" className="mt-0 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="you@example.com" />
                  </div>
                </TabsContent>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Sign In
                </Button>
              </form>
            </Tabs>

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
