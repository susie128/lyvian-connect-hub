import { Heart } from "lucide-react";

const LyvianLogo = ({ size = "default" }: { size?: "sm" | "default" | "lg" }) => {
  const sizeMap = { sm: "text-xl", default: "text-2xl", lg: "text-4xl" };
  const iconMap = { sm: 18, default: 22, lg: 32 };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center justify-center rounded-xl bg-primary p-2">
        <Heart className="text-primary-foreground" size={iconMap[size]} fill="currentColor" />
      </div>
      <span className={`font-bold tracking-tight text-foreground ${sizeMap[size]}`}>
        Lyvian
      </span>
    </div>
  );
};

export default LyvianLogo;
