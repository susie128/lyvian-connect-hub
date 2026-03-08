import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LyvianLogo from "@/components/LyvianLogo";
import { ArrowLeft, Edit2, Save, X } from "lucide-react";

const PatientSnapshot = () => {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [snapshot, setSnapshot] = useState({
    hospitalPatientId: "HP-2024-0391",
    mrn: "MRN-847291",
    diagnosis: "Type 2 Diabetes Mellitus, Hypertension Stage 1",
    medication: "Metformin 500mg BID, Lisinopril 10mg QD",
    notes: "Patient reports improved glucose control. Follow up in 3 months.",
  });

  const update = (field: string, value: string) =>
    setSnapshot((s) => ({ ...s, [field]: value }));

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

      <main className="container max-w-lg py-8 animate-fade-in">
        {/* Patient info header */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
            JM
          </div>
          <div>
            <h1 className="text-lg font-semibold">John Miller</h1>
            <p className="text-sm text-muted-foreground">LyvianID: LYV-2024-0847 · DOB: 1985-03-15</p>
          </div>
        </div>

        <Card className="border-border/50 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Patient Snapshot</CardTitle>
              <CardDescription>Lightweight profile — not an EMR record</CardDescription>
            </div>
            {!editing ? (
              <Button variant="outline" size="sm" onClick={() => setEditing(true)} className="gap-1.5">
                <Edit2 size={14} /> Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => setEditing(false)}>
                  <X size={14} />
                </Button>
                <Button size="sm" onClick={() => setEditing(false)} className="gap-1.5">
                  <Save size={14} /> Save
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <Field
              label="Hospital Patient ID"
              value={snapshot.hospitalPatientId}
              editing={editing}
              onChange={(v) => update("hospitalPatientId", v)}
            />
            <Field
              label="MRN"
              value={snapshot.mrn}
              editing={editing}
              onChange={(v) => update("mrn", v)}
            />
            <Field
              label="Diagnosis"
              value={snapshot.diagnosis}
              editing={editing}
              multiline
              onChange={(v) => update("diagnosis", v)}
            />
            <Field
              label="Medication"
              value={snapshot.medication}
              editing={editing}
              multiline
              onChange={(v) => update("medication", v)}
            />
            <Field
              label="Notes"
              value={snapshot.notes}
              editing={editing}
              multiline
              onChange={(v) => update("notes", v)}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

const Field = ({
  label, value, editing, multiline, onChange,
}: {
  label: string; value: string; editing: boolean; multiline?: boolean;
  onChange: (v: string) => void;
}) => (
  <div className="space-y-1.5">
    <Label className="text-xs text-muted-foreground">{label}</Label>
    {editing ? (
      multiline ? (
        <Textarea value={value} onChange={(e) => onChange(e.target.value)} rows={2} />
      ) : (
        <Input value={value} onChange={(e) => onChange(e.target.value)} />
      )
    ) : (
      <p className="text-sm font-medium">{value}</p>
    )}
  </div>
);

export default PatientSnapshot;
