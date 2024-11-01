import type { Hero } from "@/types/hero";

export const getHeroes = async (): Promise<Hero[]> => {
  const data = await fetch("/api/pvp/web201605/js/herolist.json").then((res) => res.json());
  return data.map((hero: Hero) => ({
    ...hero,
    avatar_url: `https://game.gtimg.cn/images/yxzj/img201606/heroimg/${hero.ename}/${hero.ename}.jpg`,
  }));
};
