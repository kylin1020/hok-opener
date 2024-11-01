
export type Hero = {
  ename: number;
  cname: string;
  id_name: string;
  title: string;
  new_type: number;
  hero_type: number;
  hero_type2?: number;
  skin_name: string;
  moss_id: number;
  avatar_url: string;
  time?: string;
  m_bl_link?: string;
  pay_type?: number;
  upgrade?: number;
};

export enum HeroType {

  // 战士
  Warrior = 1,

  // 法师
  Mage = 2,

  // 坦克
  Tank = 3,

  // 刺客
  Assassin = 4,

  // 射手
  Shooter = 5,

  // 辅助
  Support = 6,
}
