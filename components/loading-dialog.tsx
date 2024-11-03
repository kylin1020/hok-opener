import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"

interface LoadingDialogProps {
  open: boolean
}

export function LoadingDialog({ open }: LoadingDialogProps) {
  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[425px] flex flex-col items-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
        <p className="mt-4 text-lg font-medium text-gray-700">正在创建房间...</p>
        <p className="mt-2 text-sm text-gray-500">请稍候片刻</p>
      </DialogContent>
    </Dialog>
  )
} 