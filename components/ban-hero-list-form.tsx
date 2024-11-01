import React, { useState, useEffect, useMemo } from "react";
import { getHeroes } from "@/services/heroes";
import { HeroType, type Hero } from "@/types/hero";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Check } from "lucide-react"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"

const heroTypeOptions = [
    {
        name: "全部",
        value: 0
    },
    {
        name: "战士",
        value: HeroType.Warrior
    },
    {
        name: "法师",
        value: HeroType.Mage
    },
    {
        name: "坦克",
        value: HeroType.Tank
    },
    {
        name: "刺客",
        value: HeroType.Assassin
    },
    {
        name: "射手",
        value: HeroType.Shooter
    },
    {
        name: "辅助",
        value: HeroType.Support
    }
];


export function BanHeroListForm() {
  const [selectedHeroType, setSelectedHeroType] = useState<number>(0);
  const [selectedHeroNames, setSelectedHeroNames] = useState<string[]>([]);
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    getHeroes().then(setHeroes);
  }, []);

  const selectedHeroNamesDescription = useMemo(() => {
    if (selectedHeroNames.length === 0) {
      return '选择禁用英雄';
    } else if (selectedHeroNames.length <= 3) {
      return `已禁用 ${selectedHeroNames.join(', ')}`;
    } else {
      return `已禁用 ${selectedHeroNames.slice(0, 3).join(', ')} 等 ${selectedHeroNames.length} 个英雄`;
    }
  }, [selectedHeroNames]);


  const toggleSelectedHeroName = (name: string) => {
    setSelectedHeroNames((prev) => prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]);
  }

  const tabTrigger = (type: { name: string, value: number }) => (
    <TabsTrigger
      key={type.value}
      value={type.value.toString()}
      className="px-4 py-2 text-sm font-medium transition-all hover:bg-muted/50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
    >
      {type.name}
    </TabsTrigger>
  )

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger
          className="w-full"
          asChild>
          <Input 
            className="cursor-pointer w-full"
            value={selectedHeroNamesDescription}
            onClick={
              (e) => {
                e.preventDefault();
                setDialogOpen(true);
              }
            }
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>选择禁用英雄</DialogTitle>
          </DialogHeader>
          <div className="flex-grow overflow-y-auto py-4">
            <Tabs 
            value={selectedHeroType.toString()}
            onValueChange={(value) => {
                setSelectedHeroType(parseInt(value));
              }}
              className="w-full max-w-3xl mx-auto">
              <ScrollArea className="w-full whitespace-nowrap rounded-md border">
              <TabsList className="w-full justify-start">
                {heroTypeOptions.map((type) => (
                  tabTrigger(type)
                ))}
              </TabsList>
              <ScrollBar orientation="horizontal" className="hidden" />
            </ScrollArea>
            <TabsContent value={selectedHeroType.toString()}>
              <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-8 gap-4">
                {
                  heroes.filter((hero) => selectedHeroType === 0 || [hero.hero_type, hero.hero_type2].includes(selectedHeroType)).map((hero) => (
                    <Card 
                      key={hero.ename}
                      onClick={() => toggleSelectedHeroName(hero.cname)}
                      className={`relative cursor-pointer transition-all hover:scale-105 ${
                        selectedHeroNames.includes(hero.cname) ? "ring-2 ring-primary" : ""
                      }`}
                    >
                      <div className="p-4 flex flex-col items-center gap-2">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img
                              src={hero.avatar_url}
                              alt={hero.cname}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {selectedHeroNames.includes(hero.cname) && (
                            <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full p-1">
                              <Check className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                        <span className="text-sm font-medium text-center">
                          {hero.cname}
                        </span>
                      </div>
                    </Card>
                  ))
                }
              </div>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
