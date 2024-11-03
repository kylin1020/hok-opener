"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface ShareModeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (modeName: string) => void
}

export function ShareModeDialog({ open, onOpenChange, onConfirm }: ShareModeDialogProps) {
  const [modeName, setModeName] = useState("")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>为模式命名</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Input
            placeholder="输入模式名称"
            value={modeName}
            onChange={(e) => setModeName(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button 
            onClick={() => {
              if (modeName.trim()) {
                onConfirm(modeName)
                onOpenChange(false)
              }
            }}
          >
            确认
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 