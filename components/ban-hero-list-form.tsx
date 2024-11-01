import React, { useState, useEffect } from "react";
import { getHeroes } from "@/services/heroes";
import { HeroType, type Hero } from "@/types/hero";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
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
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
              {
                heroes.filter((hero) => selectedHeroType === 0 || [hero.hero_type, hero.hero_type2].includes(selectedHeroType)).map((hero) => (
                  <Card 
                    key={hero.ename}
                    onClick={() => toggleSelectedHeroName(hero.id_name)}
                    className={`relative cursor-pointer transition-all hover:scale-105 ${
                      selectedHeroNames.includes(hero.id_name) ? "ring-2 ring-primary" : ""
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
                        {selectedHeroNames.includes(hero.id_name) && (
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
  );
}
