import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import { Button } from "@/components/ui/button";

const buttonVariants = cva(
  "relative font-mono text-base px-4 py-2 transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-0 active:translate-y-0 before:content-[''] before:absolute before:inset-0 before:border before:border-dashed before:border-transparent hover:before:border-gray-400 before:transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-white text-black hover:bg-gray-50 border-2 border-black after:content-['//'] after:absolute after:top-0 after:right-1 after:text-xs after:text-gray-400 after:opacity-0 hover:after:opacity-100 after:transition-opacity",
        secondary:
          "bg-black text-white hover:bg-gray-900 border-2 border-black after:content-['{...}'] after:absolute after:top-0 after:right-1 after:text-xs after:text-gray-400 after:opacity-0 hover:after:opacity-100 after:transition-opacity",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface ButtoonProps extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export const Buttoon = ({
  children,
  onClick,
  className,
  variant,
  disabled,
}: ButtoonProps) => {
  return (
    <div className={cn("relative inline-block w-auto group", className)}>
      {/* Terminal-inspired shadow with matrix dots */}
      <div
        className={cn(
          "absolute left-[4px] top-[4px] h-full w-full border-2 transition-all duration-200",
          "before:content-[''] before:absolute before:top-1 before:left-1 before:w-1 before:h-1 before:bg-green-400 before:rounded-full before:opacity-0 group-hover:before:opacity-100",
          "after:content-[''] after:absolute after:bottom-1 after:right-1 after:w-1 after:h-1 after:bg-green-400 after:rounded-full after:opacity-0 group-hover:after:opacity-100 after:delay-75",
          variant === "secondary"
            ? "border-black bg-gray-200"
            : "border-black bg-gray-800"
        )}
      />

      <Button
        onClick={onClick}
        className={cn(buttonVariants({ variant }), className)}
        disabled={disabled}
      >
        <span className="relative z-10">{children}</span>
      </Button>
    </div>
  );
};
