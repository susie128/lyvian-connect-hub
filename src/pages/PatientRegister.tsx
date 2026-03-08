import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LyvianLogo from "@/components/LyvianLogo";
import { CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react";

const steps = ["Personal Info", "Contact", "Review"];

const PatientRegister = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "", middleName: "", lastName: "",
    gender: "", pronoun: "", dob: "",
    mobile: "", email: "", notes: "",
  });

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md animate-fade-in text-center">
          <CardContent className="pt-8 pb-8 space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
              <CheckCircle2 className="text-success" size={32} />
            </div>
            <h2 className="text-xl font-semibold">Registration Complete!</h2>
            <p className="text-muted-foreground text-sm">
              Your LyvianID has been created: <span className="font-mono font-bold text-foreground">LYV-2024-0847</span>
            </p>
            <p className="text-muted-foreground text-sm">
              You've been connected to <strong>Dr. Sarah Chen</strong> at <strong>Metro Health Network</strong>.
            </p>
            <Button onClick={() => navigate("/login")} className="mt-4 w-full">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-lg animate-fade-in">
        <div className="mb-6 flex justify-center">
          <LyvianLogo />
        </div>

        {/* Stepper */}
        <div className="mb-6 flex items-center justify-center gap-2">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {i + 1}
              </div>
              <span className={`hidden text-xs sm:inline ${i <= step ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                {s}
              </span>
              {i < steps.length - 1 && <div className={`h-px w-6 ${i < step ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        <Card className="border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Patient Registration</CardTitle>
            <CardDescription>You've been invited by Dr. Sarah Chen at Metro Health Network</CardDescription>
          </CardHeader>
          <CardContent>
            {step === 0 && (
              <div className="space-y-4 animate-fade-in">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>First Name *</Label>
                    <Input value={form.firstName} onChange={(e) => update("firstName", e.target.value)} placeholder="First name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name *</Label>
                    <Input value={form.lastName} onChange={(e) => update("lastName", e.target.value)} placeholder="Last name" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Middle Name</Label>
                  <Input value={form.middleName} onChange={(e) => update("middleName", e.target.value)} placeholder="Middle name (optional)" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <Select value={form.gender} onValueChange={(v) => update("gender", v)}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Pronoun</Label>
                    <Select value={form.pronoun} onValueChange={(v) => update("pronoun", v)}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="he-him">He/Him</SelectItem>
                        <SelectItem value="she-her">She/Her</SelectItem>
                        <SelectItem value="they-them">They/Them</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Date of Birth *</Label>
                  <Input type="date" value={form.dob} onChange={(e) => update("dob", e.target.value)} />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <Label>Mobile Number *</Label>
                  <Input type="tel" value={form.mobile} onChange={(e) => update("mobile", e.target.value)} placeholder="+1 (555) 000-0000" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com (optional)" />
                </div>
                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Any notes for your doctor (optional)" rows={3} />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-3 animate-fade-in text-sm">
                <h3 className="font-medium text-foreground">Review your details</h3>
                <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
                  <Row label="Name" value={`${form.firstName} ${form.middleName} ${form.lastName}`.trim()} />
                  <Row label="Gender" value={form.gender || "—"} />
                  <Row label="Pronoun" value={form.pronoun || "—"} />
                  <Row label="Date of Birth" value={form.dob || "—"} />
                  <Row label="Mobile" value={form.mobile} />
                  <Row label="Email" value={form.email || "—"} />
                  {form.notes && <Row label="Notes" value={form.notes} />}
                </div>
              </div>
            )}

            <div className="mt-6 flex gap-3">
              {step > 0 && (
                <Button variant="outline" onClick={() => setStep(step - 1)} className="gap-1">
                  <ArrowLeft size={14} /> Back
                </Button>
              )}
              <Button
                className="ml-auto gap-1"
                onClick={() => (step < 2 ? setStep(step + 1) : handleSubmit())}
              >
                {step < 2 ? <>Next <ArrowRight size={14} /></> : "Complete Registration"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium text-foreground">{value}</span>
  </div>
);

export default PatientRegister;
