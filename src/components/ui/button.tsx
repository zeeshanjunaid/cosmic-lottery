import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DE582] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-[#2DE582] to-green-400 hover:from-[#2DE582]/90 hover:to-green-400/90 text-black shadow-lg hover:shadow-[#2DE582]/25",
        destructive: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-500/90 hover:to-red-600/90 text-white shadow-lg",
        outline:
          "border border-white/20 bg-white/5 hover:bg-white/10 text-white hover:border-[#2DE582]/30",
        secondary:
          "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm",
        ghost: "hover:bg-white/10 text-white hover:text-[#2DE582]",
        link: "text-[#2DE582] underline-offset-4 hover:underline hover:text-[#2DE582]/80",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }