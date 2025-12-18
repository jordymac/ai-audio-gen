import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TagBadgeProps {
  label: string;
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
  variant?: "default" | "negative";
}

export function TagBadge({
  label,
  removable = false,
  onRemove,
  className,
  variant = "default",
}: TagBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium",
        variant === "negative"
          ? "bg-red-50 text-red-700 border border-red-200"
          : "bg-gray-100 text-gray-700 border border-gray-200",
        className
      )}
    >
      <span>{label}</span>
      {removable && onRemove && (
        <button
          onClick={onRemove}
          className="hover:bg-gray-200 rounded-full p-0.5 transition-colors"
          aria-label={`Remove ${label}`}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
}
