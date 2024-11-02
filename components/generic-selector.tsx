'use client'

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CommandList } from "cmdk"

export interface Option {
  value: string
  label: string
}

interface GenericSelectorProps {
  options?: Option[]
  label?: string
  placeholder?: string
  searchPlaceholder?: string
  emptySearchMessage?: string
  initialValue?: string
  onChange?: (value: string) => void
  buttonProps?: ButtonProps
}

export function GenericSelectorComponent({
  options = [],
  label = "选择选项",
  placeholder = "请选择...",
  searchPlaceholder = "搜索选项...",
  emptySearchMessage = "未找到选项。",
  initialValue = "",
  onChange,
  buttonProps,
  ...props
}: GenericSelectorProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(initialValue)

  const handleSelect = (currentValue: string) => {
    setValue(currentValue)
    setOpen(false)
    onChange?.(currentValue)
  }

  const selectedOption = options && options.find(option => option.value === value)

  return (
    <div {...props}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            {...buttonProps}
          >
            <span className="flex justify-between items-center w-full">
              <span className="font-medium">{label}</span>
              <span>{selectedOption ? selectedOption.label : placeholder}</span>
            </span>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] p-0">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandEmpty>{emptySearchMessage}</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    onSelect={() => handleSelect(option.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}