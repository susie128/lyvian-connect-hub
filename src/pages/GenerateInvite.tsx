import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LyvianLogo from "@/components/LyvianLogo";
import { ArrowLeft, Copy, QrCode, Check, Link2 } from "lucide-react";

const mockDoctors = [
  { id: "dr-001", name: "Dr. Sarah Chen" },
  { id: "dr-002", name: "Dr. James Wilson" },
  { id: "dr-003", name: "Dr. Emily Park" },
];

const GenerateInvite = () => {
  const navigate = useNavigate();
  // Mock: "practitioner" | "nurse" | "admin"
  const [role] = useState<"practitioner" | "nurse" | "admin">("practitioner");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const mockInviteLink = "https://lyvian.health/invite/abc123-xyz789";
  const isPractitioner = role === "practitioner";

  const handleGenerate = () => {
    setGenerated(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(mockInviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const canGenerate = isPractitioner || selectedDoctor;

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
            <CardTitle className="text-lg">Generate Patient Invite</CardTitle>
            <CardDescription>
              {isPractitioner
                ? "Create an invite link for your patient"
                : "Select the attending doctor, then generate an invite"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isPractitioner && (
              <div className="space-y-2">
                <Label>Attending Doctor</Label>
                <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockDoctors.map((doc) => (
                      <SelectItem key={doc.id} value={doc.id}>
                        {doc.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label>Invite Type</Label>
              <Select defaultValue="link">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="link">
                    <span className="flex items-center gap-2"><Link2 size={14} /> Invite Link</span>
                  </SelectItem>
                  <SelectItem value="qr">
                    <span className="flex items-center gap-2"><QrCode size={14} /> QR Code</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {!generated ? (
              <Button onClick={handleGenerate} className="w-full" size="lg" disabled={!canGenerate}>
                Generate Invite
              </Button>
            ) : (
              <div className="animate-fade-in space-y-4">
                <div className="rounded-lg border bg-muted/50 p-4">
                  <p className="mb-2 text-xs text-muted-foreground">Invite Link</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 truncate rounded bg-card px-2 py-1.5 text-xs font-mono border">
                      {mockInviteLink}
                    </code>
                    <Button variant="outline" size="icon" onClick={handleCopy} className="shrink-0">
                      {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                    </Button>
                  </div>
                </div>

                {/* Mock QR */}
                <div className="flex flex-col items-center gap-3 rounded-lg border bg-card p-6">
                  <div className="grid h-32 w-32 grid-cols-8 grid-rows-8 gap-px">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-sm ${Math.random() > 0.5 ? "bg-foreground" : "bg-background"}`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">Scan to register</p>
                </div>

                <div className="rounded-lg border bg-warning/5 p-3">
                  <p className="text-xs text-warning font-medium">⏳ This invite expires in 7 days</p>
                </div>

                <Button variant="outline" onClick={() => setGenerated(false)} className="w-full">
                  Generate New Invite
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default GenerateInvite;
