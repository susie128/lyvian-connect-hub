import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LyvianLogo from "@/components/LyvianLogo";
import { ArrowLeft, Copy, Check, Users, UserPlus } from "lucide-react";

const FamilyInvite = () => {
  const navigate = useNavigate();
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const mockLink = "https://lyvian.health/family/fam-456-abc";

  const handleCopy = () => {
    navigator.clipboard.writeText(mockLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container flex h-16 items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft size={16} />
          </Button>
          <LyvianLogo size="sm" />
        </div>
      </header>

      <main className="container max-w-md py-8 animate-fade-in">
        <Card className="border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users size={20} /> Family Member Invite
            </CardTitle>
            <CardDescription>
              Invite a family member to join your care team. They'll be able to participate in group chats.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Existing family */}
            <div>
              <h3 className="text-sm font-medium mb-3">Current Family Members</h3>
              <div className="space-y-2">
                {[
                  { name: "Jane Miller", relation: "Spouse", status: "Active" },
                  { name: "Tom Miller", relation: "Son", status: "Pending" },
                ].map((m) => (
                  <div key={m.name} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                        {m.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{m.name}</p>
                        <p className="text-xs text-muted-foreground">{m.relation}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-medium ${m.status === "Active" ? "text-success" : "text-warning"}`}>
                      {m.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              {!generated ? (
                <Button onClick={() => setGenerated(true)} className="w-full gap-2" size="lg">
                  <UserPlus size={16} /> Generate Family Invite
                </Button>
              ) : (
                <div className="animate-fade-in space-y-3">
                  <p className="text-sm text-muted-foreground">Share this link with your family member:</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 truncate rounded bg-muted px-2 py-1.5 text-xs font-mono border">
                      {mockLink}
                    </code>
                    <Button variant="outline" size="icon" onClick={handleCopy} className="shrink-0">
                      {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Family members can join group chats and reply, but cannot initiate 1:1 conversations.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default FamilyInvite;
