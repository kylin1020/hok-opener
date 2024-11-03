import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"

interface LoadingDialogProps {
  open: boolean
  title?: string
  description?: string
}

export function LoadingDialog({
  open,
  title = "正在创建房间...",
  description = "请稍候，我们正在为您准备游戏房间"
}: LoadingDialogProps) {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col items-center justify-center gap-4 py-8">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          <div className="text-center">
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 