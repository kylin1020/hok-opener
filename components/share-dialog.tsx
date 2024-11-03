import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ShareDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  url: string
}

const SHARE_PLATFORMS = [
  {
    name: "QQ",
    icon: "/icons/qq.svg",
    action: (url: string) => {
      window.open(`http://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(url)}`)
    }
  },
  {
    name: "微信",
    icon: "/icons/wechat.svg",
    action: (url: string) => {
      // 由于微信分享需要特殊处理，这里先复制链接
      navigator.clipboard.writeText(url)
    }
  },
  {
    name: "抖音",
    icon: "/icons/douyin.svg",
    action: (url: string) => {
      window.open(`https://www.douyin.com/share/link?url=${encodeURIComponent(url)}`)
    }
  }
]

export function ShareDialog({ open, onOpenChange, url }: ShareDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>分享到</DialogTitle>
        </DialogHeader>
        <div className="flex justify-around p-4">
          {SHARE_PLATFORMS.map((platform) => (
            <Button
              key={platform.name}
              variant="ghost"
              className="flex flex-col items-center gap-2 hover:bg-gray-100"
              onClick={() => {
                platform.action(url)
                if (platform.name === "微信") {
                  // 特殊处理微信分享
                  alert("链接已复制，请打开微信直接粘贴分享")
                }
              }}
            >
              <div className="w-12 h-12 relative">
                <Image
                  src={platform.icon}
                  alt={platform.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span>{platform.name}</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
} 