
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
};


// 英雄属性
export type HeroAttribute = {
  // 初始等级, 可选1-7, 分别表示等级为1级/4级/5级/8级/10级/12级/15级
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7;

  // 法术攻击加成, 可选1-6, 分别表示无加成/加10%/加25%/加50%/加75%/加100%
  ap: 1 | 2 | 3 | 4 | 5 | 6;

  // 物理攻击加成, 可选1-6, 分别表示无加成/加10%/加25%/加50%/加75%/加100%
  ad: 1 | 2 | 3 | 4 | 5 | 6;

  // 冷却缩减, 可选1-5, 分别表示无加成/减25%/减40%/减80%/减99%
  cd: 1 | 2 | 3 | 4 | 5;

  // 初始金币, 可选1-5, 分别表示无加成/1000/2000/5000/12000
  gold: 1 | 2 | 3 | 4 | 5;

  // 移速, 可选1-4, 分别表示无加成/加10%/加20%/加30%
  speed: 1 | 2 | 3 | 4;
}
