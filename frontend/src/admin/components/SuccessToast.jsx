import React, { useEffect } from "react";
import { Check } from "lucide-react";

export default function SuccessToast({ open, onClose, text = "Successfully" }) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed top-6 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-6 py-3 shadow-lg animate-slide-down">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-600">
          <Check className="h-5 w-5 text-white" />
        </div>
        <span className="text-sm font-semibold text-green-800">
          {text}
        </span>
      </div>
    </div>
  );
}
