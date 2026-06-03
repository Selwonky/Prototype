"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const stepperVariants = cva("flex w-full", {
  variants: {
    orientation: {
      horizontal: "flex-row items-center",
      vertical: "flex-col",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
})

const stepVariants = cva(
  "flex items-center justify-center rounded-full font-medium transition-colors",
  {
    variants: {
      size: {
        sm: "size-7 text-xs",
        default: "size-9 text-sm",
        lg: "size-11 text-base",
      },
      status: {
        completed: "bg-primary text-primary-foreground",
        current: "bg-primary text-primary-foreground",
        upcoming: "border-2 border-muted-foreground/30 text-muted-foreground bg-background",
      },
    },
    defaultVariants: {
      size: "default",
      status: "upcoming",
    },
  }
)

const connectorVariants = cva("transition-colors", {
  variants: {
    orientation: {
      horizontal: "h-0.5 flex-1 mx-2",
      vertical: "ml-4 h-8 w-0.5 my-2",
    },
    status: {
      completed: "bg-primary",
      upcoming: "bg-muted-foreground/30",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    status: "upcoming",
  },
})

interface Step {
  label: string
  description?: string
}

interface StepperProps extends VariantProps<typeof stepperVariants> {
  steps: Step[]
  currentStep: number
  className?: string
  size?: "sm" | "default" | "lg"
  onStepClick?: (step: number) => void
  showLabels?: boolean
}

function Stepper({
  steps,
  currentStep,
  orientation = "horizontal",
  size = "default",
  className,
  onStepClick,
  showLabels = true,
}: StepperProps) {
  const getStepStatus = (index: number): "completed" | "current" | "upcoming" => {
    if (index < currentStep) return "completed"
    if (index === currentStep) return "current"
    return "upcoming"
  }

  const isClickable = !!onStepClick

  if (orientation === "vertical") {
    return (
      <div
        data-slot="stepper"
        data-orientation={orientation}
        className={cn(stepperVariants({ orientation }), className)}
      >
        {steps.map((step, index) => {
          const status = getStepStatus(index)
          const isLast = index === steps.length - 1

          return (
            <div key={index} className="flex flex-col">
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  data-slot="step"
                  data-status={status}
                  onClick={() => isClickable && onStepClick(index)}
                  disabled={!isClickable}
                  className={cn(
                    stepVariants({ size, status }),
                    isClickable && "cursor-pointer hover:opacity-80",
                    !isClickable && "cursor-default"
                  )}
                >
                  {status === "completed" ? (
                    <Check className={cn(size === "sm" ? "size-3.5" : size === "lg" ? "size-5" : "size-4")} />
                  ) : (
                    index + 1
                  )}
                </button>
                {showLabels && (
                  <div className="flex flex-col pt-1">
                    <span
                      data-slot="step-label"
                      className={cn(
                        "font-medium",
                        size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm",
                        status === "upcoming" && "text-muted-foreground"
                      )}
                    >
                      {step.label}
                    </span>
                    {step.description && (
                      <span
                        data-slot="step-description"
                        className="text-xs text-muted-foreground mt-0.5"
                      >
                        {step.description}
                      </span>
                    )}
                  </div>
                )}
              </div>
              {!isLast && (
                <div
                  data-slot="step-connector"
                  className={cn(
                    connectorVariants({
                      orientation,
                      status: status === "completed" ? "completed" : "upcoming",
                    })
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div
      data-slot="stepper"
      data-orientation={orientation}
      className={cn(stepperVariants({ orientation }), className)}
    >
      {steps.map((step, index) => {
        const status = getStepStatus(index)
        const isLast = index === steps.length - 1

        return (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center gap-2">
              <button
                type="button"
                data-slot="step"
                data-status={status}
                onClick={() => isClickable && onStepClick(index)}
                disabled={!isClickable}
                className={cn(
                  stepVariants({ size, status }),
                  isClickable && "cursor-pointer hover:opacity-80",
                  !isClickable && "cursor-default"
                )}
              >
                {status === "completed" ? (
                  <Check className={cn(size === "sm" ? "size-3.5" : size === "lg" ? "size-5" : "size-4")} />
                ) : (
                  index + 1
                )}
              </button>
              {showLabels && (
                <div className="flex flex-col items-center text-center">
                  <span
                    data-slot="step-label"
                    className={cn(
                      "font-medium whitespace-nowrap",
                      size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm",
                      status === "upcoming" && "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </span>
                  {step.description && (
                    <span
                      data-slot="step-description"
                      className="text-xs text-muted-foreground mt-0.5 max-w-24"
                    >
                      {step.description}
                    </span>
                  )}
                </div>
              )}
            </div>
            {!isLast && (
              <div
                data-slot="step-connector"
                className={cn(
                  connectorVariants({
                    orientation,
                    status: status === "completed" ? "completed" : "upcoming",
                  })
                )}
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export { Stepper }
export type { Step, StepperProps }
