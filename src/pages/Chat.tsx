import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LyvianLogo from "@/components/LyvianLogo";
import { ArrowLeft, Send } from "lucide-react";
import { useState } from "react";

const mockMessages = [
  { id: 1, sender: "staff", text: "Hi John, welcome to Metro Health Network. How are you feeling today?", time: "10:30 AM" },
  { id: 2, sender: "patient", text: "Hi Dr. Chen, I've been feeling much better since the last visit. Thank you!", time: "10:32 AM" },
  { id: 3, sender: "staff", text: "Great to hear! Remember to take your medication as prescribed. Let me know if you have any questions.", time: "10:35 AM" },
];

const Chat = () => {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);

  const patientName = patientId?.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") || "Patient";

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: "staff", text: message, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-card">
        <div className="container flex h-14 items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft size={18} />
          </Button>
          <div>
            <h1 className="text-sm font-semibold">{patientName}</h1>
            <p className="text-xs text-muted-foreground">Patient</p>
          </div>
        </div>
      </header>

      <div className="flex-1 container max-w-2xl py-4 overflow-y-auto">
        <div className="space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "staff" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                msg.sender === "staff"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}>
                <p className="text-sm">{msg.text}</p>
                <p className={`text-[10px] mt-1 ${
                  msg.sender === "staff" ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}>{msg.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t bg-card p-3">
        <div className="container max-w-2xl flex gap-2">
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />
          <Button size="icon" onClick={handleSend} disabled={!message.trim()}>
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
