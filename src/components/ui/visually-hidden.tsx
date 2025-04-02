import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

const VisuallyHidden = forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "absolute h-px w-px p-0 overflow-hidden whitespace-nowrap border-0",
        className
      )}
      style={{
        clip: "rect(0 0 0 0)",
        clipPath: "inset(50%)",
        margin: "-1px",
      }}
      {...props}
    />
  );
});

VisuallyHidden.displayName = "VisuallyHidden";

export { VisuallyHidden };
