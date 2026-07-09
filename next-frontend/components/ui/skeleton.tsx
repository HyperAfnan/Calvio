import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const skeletonVariants = cva("animate-pulse bg-muted", {
  variants: {
    variant: {
      text: "h-4 w-full rounded-md",
      circular: "rounded-full",
      rectangular: "rounded-2xl",
    },
  },
  defaultVariants: {
    variant: "rectangular",
  },
})

function Skeleton({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof skeletonVariants>) {
  return (
    <div
      data-slot="skeleton"
      className={cn(skeletonVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Skeleton }
