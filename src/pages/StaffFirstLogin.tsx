import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LyvianLogo from "@/components/LyvianLogo";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";

const StaffFirstLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md animate-fade-in text-center">
          <CardContent className="pt-8 pb-8 space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
              <ShieldCheck className="text-success" size={32} />
            </div>
            <h2 className="text-xl font-semibold">Account Activated</h2>
            <p className="text-muted-foreground text-sm">
              Your password has been updated. You can now sign in with your new credentials.
            </p>
            <Button onClick={() => navigate("/login")} className="w-full mt-4">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="mb-8 flex justify-center">
          <LyvianLogo size="lg" />
        </div>

        <Card className="border-border/50 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-lg">Set Your Password</CardTitle>
            <CardDescription>
              Welcome to Lyvian! Please set a new password to activate your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="space-y-4">
              <div className="space-y-2">
                <Label>Temporary Password</Label>
                <Input type="password" placeholder="Enter temporary password" />
              </div>
              <div className="space-y-2">
                <Label>New Password</Label>
                <div className="relative">
                  <Input type={showPassword ? "text" : "password"} placeholder="Choose a strong password" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Confirm New Password</Label>
                <div className="relative">
                  <Input type={showConfirm ? "text" : "password"} placeholder="Re-enter new password" />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full" size="lg">
                Activate Account
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StaffFirstLogin;
