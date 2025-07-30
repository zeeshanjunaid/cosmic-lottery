import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-bold tracking-wide uppercase transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2DE582] focus:ring-offset-2 focus:ring-offset-transparent backdrop-blur-sm",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gradient-to-r from-[#2DE582] to-green-400 text-black hover:from-[#2DE582]/90 hover:to-green-400/90 shadow-lg",
        secondary:
          "border-transparent bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm",
        destructive:
          "border-transparent bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-500/90 hover:to-red-600/90 shadow-lg",
        outline: "text-white border-white/30 hover:bg-white/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }