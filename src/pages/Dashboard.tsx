import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LyvianLogo from "@/components/LyvianLogo";
import { UserPlus, Users, ClipboardList, LogOut, QrCode, Link2, RefreshCw, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Role = "practitioner" | "nurse" | "admin" | "patient";

const Dashboard = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("practitioner");

  const isStaff = role !== "patient";
  const displayName = isStaff ? "Dr. Sarah Chen" : "John Miller";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container flex h-16 items-center justify-between">
          <LyvianLogo size="sm" />
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{displayName}</span>
            <Button variant="ghost" size="icon" onClick={() => navigate("/login")}>
              <LogOut size={16} />
            </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-4xl py-8 animate-fade-in">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Metro Health Network</p>
            </div>
            {/* Demo role switcher */}
            <div className="flex items-center gap-2">
              <RefreshCw size={14} className="text-muted-foreground" />
              <Select value={role} onValueChange={(v) => setRole(v as Role)}>
                <SelectTrigger className="w-[140px] h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="practitioner">Practitioner</SelectItem>
                  <SelectItem value="nurse">Nurse</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="patient">Patient</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {isStaff && (
            <DashCard
              icon={<UserPlus />}
              title="Generate Patient Invite"
              description="Create invite link or QR code for a new patient"
              onClick={() => navigate("/invite")}
            />
          )}
          {!isStaff && (
            <DashCard
              icon={<Users />}
              title="Family Invites"
              description="Invite family members to join your care team"
              onClick={() => navigate("/family-invite")}
            />
          )}
          {isStaff && (
            <DashCard
              icon={<ClipboardList />}
              title="Patient Snapshot"
              description="View and edit lightweight patient profiles"
              onClick={() => navigate("/snapshot")}
            />
          )}
        </div>

        {/* Recent invites mock */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-base">Recent Invites</CardTitle>
            <CardDescription>Latest patient invite activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "John Miller", status: "Joined", time: "2 hours ago", icon: Link2, link: "/chat/john-miller" },
                { name: "Maria Garcia", status: "Pending", time: "1 day ago", icon: QrCode },
                { name: "David Park", status: "Expired", time: "8 days ago", icon: Link2 },
              ].map((invite) => (
                <div
                  key={invite.name}
                  className={`flex items-center justify-between rounded-lg border p-3 ${
                    invite.link ? "cursor-pointer hover:bg-muted/50 transition-colors" : ""
                  }`}
                  onClick={() => invite.link && navigate(invite.link)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                      <invite.icon size={16} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{invite.name}</p>
                      <p className="text-xs text-muted-foreground">{invite.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      invite.status === "Joined"
                        ? "bg-success/10 text-success"
                        : invite.status === "Pending"
                        ? "bg-warning/10 text-warning"
                        : "bg-destructive/10 text-destructive"
                    }`}>
                      {invite.status}
                    </span>
                    {invite.link && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10"
                        onClick={(e) => { e.stopPropagation(); navigate(invite.link!); }}
                      >
                        <MessageCircle size={16} />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

const DashCard = ({
  icon, title, description, onClick,
}: {
  icon: React.ReactNode; title: string; description: string; onClick: () => void;
}) => (
  <Card className="cursor-pointer transition-all hover:shadow-md hover:border-primary/30" onClick={onClick}>
    <CardContent className="flex items-start gap-4 pt-6">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-sm">{title}</h3>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
    </CardContent>
  </Card>
);

export default Dashboard;
