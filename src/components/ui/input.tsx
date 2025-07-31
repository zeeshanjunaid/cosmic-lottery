import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "relative flex h-12 w-full rounded-xl border border-white/20 bg-gradient-to-br from-[#1C1C1C]/90 via-[#181830]/80 to-[#1C1C1C]/90 backdrop-blur-lg px-4 py-3 text-sm text-white font-medium ring-offset-transparent shadow-lg shadow-black/20 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DE582]/50 focus-visible:border-[#2DE582] focus-visible:shadow-[0_0_20px_rgba(45,229,130,0.15)] hover:bg-gradient-to-br hover:from-[#1C1C1C] hover:via-[#181830]/90 hover:to-[#1C1C1C] hover:border-[#2DE582]/30 hover:shadow-[0_4px_20px_rgba(45,229,130,0.1)] active:scale-[0.998] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 ease-out",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }