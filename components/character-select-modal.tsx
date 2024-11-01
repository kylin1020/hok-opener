"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Character {
  id: string
  name: string
  image: string
}

const characters: Character[] = [
  { id: "1", name: "影", image: "/placeholder.svg?height=80&width=80" },
  { id: "2", name: "少司绿", image: "/placeholder.svg?height=80&width=80" },
  { id: "3", name: "元流之子(坦克)", image: "/placeholder.svg?height=80&width=80" },
  { id: "4", name: "元流之子(法师)", image: "/placeholder.svg?height=80&width=80" },
  { id: "5", name: "大司命", image: "/placeholder.svg?height=80&width=80" },
  { id: "6", name: "敖隐", image: "/placeholder.svg?height=80&width=80" },
  { id: "7", name: "莱西奥", image: "/placeholder.svg?height=80&width=80" },
  { id: "8", name: "赵怀真", image: "/placeholder.svg?height=80&width=80" },
  { id: "9", name: "海月", image: "/placeholder.svg?height=80&width=80" },
  { id: "10", name: "戈娅", image: "/placeholder.svg?height=80&width=80" },
  { id: "11", name: "桑启", image: "/placeholder.svg?height=80&width=80" },
  { id: "12", name: "晶", image: "/placeholder.svg?height=80&width=80" },
]

export function CharacterSelectModal() {
  const [selected, setSelected] = useState<string[]>([])
  const [tempSelected, setTempSelected] = useState<string[]>([])
  const [open, setOpen] = useState(false)

  const toggleSelect = (id: string) => {
    setTempSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const handleConfirm = () => {
    setSelected(tempSelected)
    setOpen(false)
  }

  const handleCancel = () => {
    setTempSelected(selected)
    setOpen(false)
  }

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setTempSelected(selected)}
            className="w-full"
          >
            选择角色
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>选择角色</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-4 py-4">
            {characters.map((character) => (
              <Card
                key={character.id}
                className={`relative cursor-pointer transition-all hover:scale-105 ${
                  tempSelected.includes(character.id) ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => toggleSelect(character.id)}
              >
                <div className="p-2 flex flex-col items-center gap-2">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img
                        src={character.image}
                        alt={character.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {tempSelected.includes(character.id) && (
                      <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full p-1">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-medium text-center">
                    {character.name}
                  </span>
                </div>
              </Card>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>取消</Button>
            <Button onClick={handleConfirm}>确认</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="mt-4">
        <h3 className="font-semibold mb-2">已选择的角色：</h3>
        <div className="flex flex-wrap gap-2">
          {selected.map(id => {
            const character = characters.find(c => c.id === id)
            return character ? (
              <span key={id} className="px-2 py-1 bg-primary/10 rounded-full text-sm">
                {character.name}
              </span>
            ) : null
          })}
        </div>
      </div>
    </div>
  )
}