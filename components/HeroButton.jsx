import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";


export default function GetStartedButton({
  text = "Plan Your Visit",
  className,
}) {
  return (
    <div className="min-h-12 w-58 mt-8">
      <button
        className={cn(
          "spiritual-button group flex h-12 items-center justify-center gap-3 rounded-full bg-spiritual-gold px-6 py-3 font-semibold transition-all duration-300 ease-in-out hover:bg-gold-accent shadow-lg",
          className,
        )}
        data-button="plan-visit"
      >
        <span
          className={cn(
            "text-white transition-colors duration-300 ease-in-out",
          )}
        >
          {text}
        </span>
        <div
          className={cn(
            "relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full transition-transform duration-300",
            "bg-white",
          )}
        >
          <div className="absolute left-0 flex h-7 w-14 -translate-x-1/2 items-center justify-center transition-all duration-300 ease-in-out group-hover:translate-x-0">
            <ArrowRight
              size={16}
              className={cn(
                "size-7 transform p-1 text-spiritual-gold opacity-0 group-hover:opacity-100",
              )}
            />
            <ArrowRight
              size={16}
              className={cn(
                "size-7 transform p-1 text-spiritual-gold opacity-100 transition-transform duration-300 ease-in-out group-hover:opacity-0",
              )}
            />
          </div>
        </div>
      </button>
    </div>
  );
}
