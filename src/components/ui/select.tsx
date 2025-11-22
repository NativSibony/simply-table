import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "st-border-input data-[placeholder]:st-text-muted-foreground [&_svg:not([class*='text-'])]:st-text-muted-foreground focus-visible:st-border-ring focus-visible:st-ring-ring/50 aria-invalid:st-ring-destructive/20 dark:aria-invalid:st-ring-destructive/40 aria-invalid:st-border-destructive dark:st-bg-input/30 dark:hover:st-bg-input/50 st-flex st-w-fit st-items-center st-justify-between st-gap-2 st-rounded-md st-border st-bg-transparent st-px-3 st-py-2 st-text-sm st-whitespace-nowrap st-shadow-xs st-transition-[color,box-shadow] st-outline-none focus-visible:st-ring-[3px] disabled:st-cursor-not-allowed disabled:st-opacity-50 data-[size=default]:st-h-9 data-[size=sm]:st-h-8 *:data-[slot=select-value]:st-line-clamp-1 *:data-[slot=select-value]:st-flex *:data-[slot=select-value]:st-items-center *:data-[slot=select-value]:st-gap-2 [&_svg]:st-pointer-events-none [&_svg]:st-shrink-0 [&_svg:not([class*='size-'])]:st-size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="st-size-4 st-opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "popper",
  align = "center",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "st-bg-popover st-text-popover-foreground data-[state=open]:st-animate-in data-[state=closed]:st-animate-out data-[state=closed]:st-fade-out-0 data-[state=open]:st-fade-in-0 data-[state=closed]:st-zoom-out-95 data-[state=open]:st-zoom-in-95 data-[side=bottom]:st-slide-in-from-top-2 data-[side=left]:st-slide-in-from-right-2 data-[side=right]:st-slide-in-from-left-2 data-[side=top]:st-slide-in-from-bottom-2 st-relative st-z-50 st-max-h-(--radix-select-content-available-height) st-min-w-[8rem] st-origin-(--radix-select-content-transform-origin) st-overflow-x-hidden st-overflow-y-auto st-rounded-md st-border st-shadow-md",
          position === "popper" &&
            "data-[side=bottom]:st-translate-y-1 data-[side=left]:st--translate-x-1 data-[side=right]:st-translate-x-1 data-[side=top]:st--translate-y-1",
          className
        )}
        position={position}
        align={align}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "st-p-1",
            position === "popper" &&
              "st-h-[var(--radix-select-trigger-height)] st-w-full st-min-w-[var(--radix-select-trigger-width)] st-scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("st-text-muted-foreground st-px-2 st-py-1.5 st-text-xs", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:st-bg-accent focus:st-text-accent-foreground [&_svg:not([class*='text-'])]:st-text-muted-foreground st-relative st-flex st-w-full st-cursor-default st-items-center st-gap-2 st-rounded-sm st-py-1.5 st-pr-8 st-pl-2 st-text-sm st-outline-hidden st-select-none data-[disabled]:st-pointer-events-none data-[disabled]:st-opacity-50 [&_svg]:st-pointer-events-none [&_svg]:st-shrink-0 [&_svg:not([class*='size-'])]:st-size-4 *:[span]:last:st-flex *:[span]:last:st-items-center *:[span]:last:st-gap-2",
        className
      )}
      {...props}
    >
      <span className="st-absolute st-right-2 st-flex st-size-3.5 st-items-center st-justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="st-size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("st-bg-border st-pointer-events-none st--mx-1 st-my-1 st-h-px", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "st-flex st-cursor-default st-items-center st-justify-center st-py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="st-size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "st-flex st-cursor-default st-items-center st-justify-center st-py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="st-size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
