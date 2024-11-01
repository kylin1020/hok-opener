import React, { useState, useEffect } from "react";
import { getHeroes } from "@/services/heroes";
import { HeroType, type Hero } from "@/types/hero";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

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
  const [heroes, setHeroes] = useState<Hero[]>([]);

  useEffect(() => {
    getHeroes().then(setHeroes);
  }, []);


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
    <div>
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
          {
            heroes.filter((hero) => selectedHeroType === 0 || [hero.hero_type, hero.hero_type2].includes(selectedHeroType)).map((hero) => (
              <div key={hero.ename}>
                {hero.cname}
              </div>
            ))
          }
        </Tabs>
    </div>
  );
}
