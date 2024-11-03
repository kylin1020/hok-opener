"use client"

import { useState, useEffect, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { HeroType, type Hero } from "@/types/hero"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Check } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { GenericSelectorComponent } from './generic-selector'


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


const UnselectableHeroes: string[] = [
  "亚连",
  "芈月",
  "云中君",
  "杨玉环",
  "貂蝉"
];

const InvincibleHeroes: string[] = [
  "亚连",
  "芈月",
  "云中君",
  "杨玉环",
  "貂蝉",
  "盾山",
  "太乙真人",
  "庄周",
  "孙膑",
  "瑶",
  "武则天",
  "后羿"
];

const GlobalSkillsHeroes: string[] = [
  "武则天",
  "女娲"
];

interface BanHeroListFormProps {
  heroes: Hero[];
  banHeroNames: string[];
  setBanHeroNames: (names: string[]) => void;
}

export function BanHeroListForm({ heroes, banHeroNames, setBanHeroNames }: BanHeroListFormProps) {
  const [selectedHeroType, setSelectedHeroType] = useState<number>(0);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  // 禁无敌
  const [disableInvincible, setDisableInvincible] = useState(false)
  // 禁无法选中
  const [disableUnselectable, setDisableUnselectable] = useState(false)
  // 禁全图施法
  const [disableGlobalSkills, setDisableGlobalSkills] = useState(false)

  const selectedHeroNamesDescription = useMemo(() => {
    if (banHeroNames.length === 0) {
      return '选择禁用英雄';
    } else if (banHeroNames.length <= 3) {
      return `已禁用 ${banHeroNames.join(', ')}`;
    } else {
      return `已禁用 ${banHeroNames.slice(0, 3).join(', ')} 等 ${banHeroNames.length} 位英雄`;
    }
  }, [banHeroNames]);


  const toggleBanHeroName = (name: string) => {
    if (banHeroNames.includes(name)) {
      setBanHeroNames(banHeroNames.filter((n) => n !== name));
    } else {
      setBanHeroNames([...banHeroNames, name]);
    }
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
    <div className="w-full max-w-md mx-auto p-2">
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
          <div className="flex items-center space-x-2 py-4">
            <span className="text-sm font-medium">快捷禁用:</span>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="disable-invincible"
                checked={disableInvincible}
                onCheckedChange={(checked) => {
                  setDisableInvincible(checked as boolean);
                  if (!checked) {
                    const newBanHeroNames = banHeroNames.filter(name => !InvincibleHeroes.includes(name));
                    setBanHeroNames(newBanHeroNames);
                  } else {
                    const newBanHeroNames = [...banHeroNames, ...InvincibleHeroes.filter(hero => !banHeroNames.includes(hero))];
                    setBanHeroNames(newBanHeroNames);
                  }
                }}
              />
              <label
                htmlFor="disable-invincible"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                禁无敌
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="disable-unavailable"
                checked={disableUnselectable}
                onCheckedChange={(checked) => {
                  setDisableUnselectable(checked as boolean);
                  if (!checked) {
                    const newBanHeroNames = banHeroNames.filter(name => !UnselectableHeroes.includes(name));
                    setBanHeroNames(newBanHeroNames);
                  } else {
                    const newBanHeroNames = [...banHeroNames, ...UnselectableHeroes.filter(hero => !banHeroNames.includes(hero))];
                    setBanHeroNames(newBanHeroNames);
                  }
                }}
              />
              <label
                htmlFor="disable-unavailable"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                禁无法选中
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="disable-global-skills"
                checked={disableGlobalSkills}
                onCheckedChange={(checked) => {
                  setDisableGlobalSkills(checked as boolean);
                  if (!checked) {
                    const newBanHeroNames = banHeroNames.filter(name => !GlobalSkillsHeroes.includes(name));
                    setBanHeroNames(newBanHeroNames);
                  } else {
                    const newBanHeroNames = [...banHeroNames, ...GlobalSkillsHeroes.filter(hero => !banHeroNames.includes(hero))];
                    setBanHeroNames(newBanHeroNames);
                  }
                }}
              />
              <label
                htmlFor="disable-global-skills"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                禁全图施法
              </label>
            </div>
          </div>
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
                      onClick={() => toggleBanHeroName(hero.cname)}
                      className={`relative cursor-pointer transition-all hover:scale-105 ${
                        banHeroNames.includes(hero.cname) ? "ring-2 ring-primary" : ""
                      }`}
                    >
                      <div className="p-4 flex flex-col items-center gap-2">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <Image
                              src={hero.avatar_url}
                              alt={hero.cname}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {banHeroNames.includes(hero.cname) && (
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

const GameConfigTabs = [
  {
    name: '英雄',
    value: 'hero'
  },
  {
    name: '兵线/野怪',
    value: 'line'
  },
  {
    name: '防御塔/水晶',
    value: 'tower'
  }
];

interface CustomDefineSettingItem {
  name?: string;
  value: string;
  index: string | string[];
}

type HeroCustomDefineSettingItem = {
  // 等级
  level: CustomDefineSettingItem;
  // 法术攻击
  magicAttack: CustomDefineSettingItem;
  // 物理攻击
  physicalAttack: CustomDefineSettingItem;
  // 冷却缩减
  coolDown: CustomDefineSettingItem;
  // 金币
  gold: CustomDefineSettingItem;
  // 移动速度
  speed: CustomDefineSettingItem;
}

type LineCustomDefineSettingItem = {
  // 攻击力
  attack: CustomDefineSettingItem;
  // 血量
  health: CustomDefineSettingItem;
  // 移动速度
  speed: CustomDefineSettingItem;
  //刷新速度
  refreshSpeed: CustomDefineSettingItem;
  // 出兵类型
  spawnType: CustomDefineSettingItem;
}

// 防御塔
type TowerCustomDefineSettingItem = {
  // 攻击力
  attack: CustomDefineSettingItem;
  // 攻击范围
  attackRange: CustomDefineSettingItem;
  //血量
  health: CustomDefineSettingItem;
}

// 水晶
type CrystalCustomDefineSettingItem = {
  // 攻击力
  attack: CustomDefineSettingItem;
  // 血量
  health: CustomDefineSettingItem;
}

// 野怪
type MonsterCustomDefineSettingItem = {
  // 攻击力
  attack: CustomDefineSettingItem;
  // 血量
  health: CustomDefineSettingItem;
}

type CustomDefineSettingDataType = {
  blue: {
    heroes: HeroCustomDefineSettingItem[];
    line: LineCustomDefineSettingItem;
    tower: TowerCustomDefineSettingItem;
    monster: MonsterCustomDefineSettingItem;
    crystal: CrystalCustomDefineSettingItem;
  },
  red: {
    heroes: HeroCustomDefineSettingItem[];
    line: LineCustomDefineSettingItem;
    tower: TowerCustomDefineSettingItem;
    monster: MonsterCustomDefineSettingItem;
    crystal: CrystalCustomDefineSettingItem;
  }
}

const getCustomDefineSettingData = (): CustomDefineSettingDataType => ({
  blue: {
    heroes: [
      {
        level: {
          value: '1',
          index: '0'
        },
        magicAttack: {
          value: '1',
          index: '1'
        },
        physicalAttack: {
          value: '1',
          index: '2'
        },
        coolDown: {
          value: '1',
          index: '3'
        },
        gold: {
          value: '1',
          index: '4'
        },
        speed: {
          value: '1',
          index: '106'
        }
      },
      {
        level: {
          value: '1',
          index: '51'
        },
        magicAttack: {
          value: '1',
          index: '52'
        },
        physicalAttack: {
          value: '1',
          index: '53'
        },
        coolDown: {
          value: '1',
          index: '54'
        },
        gold: {
          value: '1',
          index: '55'
        },
        speed: {
          value: '1',
          index: '107'
        }
      },
      {
        level: {
          value: '1',
          index: '56'
        },
        magicAttack: {
          value: '1',
          index: '57'
        },
        physicalAttack: {
          value: '1',
          index: '58'
        },
        coolDown: {
          value: '1',
          index: '59'
        },
        gold: {
          value: '1',
          index: '60'
        },
        speed: {
          value: '1',
          index: '108'
        }
      },
      {
        level: {
          value: '1',
          index: '61'
        },
        magicAttack: {
          value: '1',
          index: '62'
        },
        physicalAttack: {
          value: '1',
          index: '63'
        },
        coolDown: {
          value: '1',
          index: '64'
        },
        gold: {
          value: '1',
          index: '65'
        },
        speed: {
          value: '1',
          index: '109'
        }
      },
      {
        level: {
          value: '1',
          index: '66'
        },
        magicAttack: {
          value: '1',
          index: '67'
        },
        physicalAttack: {
          value: '1',
          index: '68'
        },
        coolDown: {
          value: '1',
          index: '69'
        },
        gold: {
          value: '1',
          index: '70'
        },
        speed: {
          value: '1',
          index: '110'
        }
      }
    ],
    line: {
      attack: {
        value: '1',
        index: '5'
      },
      health: {
        value: '1',
        index: '6'
      },
      speed: {
        value: '1',
        index: '7'
      },
      refreshSpeed: {
        value: '1',
        index: '8'
      },
      spawnType: {
        value: '1',
        index: '9'
      }
    },
    tower: {
      attack: {
          value: '1',
          index: ['13', '22']
      },
      attackRange: {
        value: '1',
        index: ['15', '24']
      },
      health: {
        value: '1',
        index: ['14', '23']
      }
    },
    monster: {
      attack: {
        value: '1',
        index: '11'
      },
      health: {
        value: '1',
        index: '12'
      }
    },
    crystal: {
      attack: {
        value: '1',
        index: '16'
      },
      health: {
        value: '1',
        index: '17'
      }
    }
  },
  red: {
    heroes: [
      {
        level: {
          value: '1',
          index: '28'
        },
        magicAttack: {
          value: '1',
          index: '29'
        },
        physicalAttack: {
          value: '1',
          index: '30'
        },
        coolDown: {
          value: '1',
          index: '31'
        },
        gold: {
          value: '1',
          index: '32'
        },
        speed: {
          value: '1',
          index: '111'
        }
      },
      {
        level: {
          value: '1',
          index: '71'
        },
        magicAttack: {
          value: '1',
          index: '72'
        },
        physicalAttack: {
          value: '1',
          index: '73'
        },
        coolDown: {
          value: '1',
          index: '74'
        },
        gold: {
          value: '1',
          index: '75'
        },
        speed: {
          value: '1',
          index: '112'
        }
      },
      {
        level: {
          value: '1',
          index: '76'
        },
        magicAttack: {
          value: '1',
          index: '77'
        },
        physicalAttack: {
          value: '1',
          index: '78'
        },
        coolDown: {
          value: '1',
          index: '79'
        },
        gold: {
          value: '1',
          index: '80'
        },
        speed: {
          value: '1',
          index: '113'
        }
      },
      {
        level: {
          value: '1',
          index: '81'
        },
        magicAttack: {
          value: '1',
          index: '82'
        },
        physicalAttack: {
          value: '1',
          index: '83'
        },
        coolDown: {
          value: '1',
          index: '84'
        },
        gold: {
          value: '1',
          index: '85'
        },
        speed: {
          value: '1',
          index: '114'
        }
      },
      {
        level: {
          value: '1',
          index: '86'
        },
        magicAttack: {
          value: '1',
          index: '87'
        },
        physicalAttack: {
          value: '1',
          index: '88'
        },
        coolDown: {
          value: '1',
          index: '89'
        },
        gold: {
          value: '1',
          index: '90'
        },
        speed: {
          value: '1',
          index: '115'
        }
      }
    ],
    line: {
      attack: {
        value: '1',
        index: '33'
      },
      health: {
        value: '1',
        index: '34'
      },
      speed: {
        value: '1',
        index: '35'
      },
      refreshSpeed: {
        value: '1',
        index: '36'
      },
      spawnType: {
        value: '1',
        index: '37'
      }
    },
    tower: {
      attack: {
        value: '1',
        index: ['41', '48']
      },
      attackRange: {
        value: '1',
        index: ['43', '50']
      },
      health: {
        value: '1',
        index: ['42', '49']
      }
    },
    monster: {
      attack: {
        value: '1',
        index: '39'
      },
      health: {
        value: '1',
        index: '40'
      }
    },
    crystal: {
      attack: {
        value: '1',
        index: '44'
      },
      health: {
        value: '1',
        index: '45'
      }
    }
  }
})

const toCustomDefineItemStingList = (index: string | string[], value: string) => {
  if (Array.isArray(index)) {
    return index.map(i => `${i}:${value}`)
  }
  return [`${index}:${value}`]
}

// 英雄修改属性表单
type HeroConfigFormComponentProps = {
  levelInitialValue: string
  magicAttackInitialValue: string
  physicalAttackInitialValue: string
  coolDownInitialValue: string
  speedInitialValue: string
  onLevelChange: (value: string) => void
  onMagicAttackChange: (value: string) => void
  onPhysicalAttackChange: (value: string) => void
  onCoolDownChange: (value: string) => void
  onSpeedChange: (value: string) => void
}

function HeroConfigFormComponent(props: HeroConfigFormComponentProps) {
  const { levelInitialValue, magicAttackInitialValue, 
          physicalAttackInitialValue, coolDownInitialValue, 
          speedInitialValue, onLevelChange, onMagicAttackChange, 
          onPhysicalAttackChange, onCoolDownChange, onSpeedChange } = props
  return (
    <div className="space-y-2">
      <GenericSelectorComponent
        options={
          [
            {
              value: '1',
              label: '1级'
            },
            {
              value: '2',
              label: '4级'
            },
            {
              value: '3',
              label: '5级'
            },
            {
              value: '4',
              label: '8级'
            },
            {
              value: '5',
              label: '10级'
            },
            {
              value: '6',
              label: '12级'
            },
            {
              value: '7',
              label: '15级'
            }
          ]
        }
        initialValue={levelInitialValue}
        onChange={(value) => {
          onLevelChange(value)
        }}
        label="初始等级"
      />
      <GenericSelectorComponent
        options={[
          {
            value: '1',
            label: '无加成'
          },
          {
            value: '2',
            label: '10%加成'
          },
          {
            value: '3',
            label: '25%加成'
          },
          {
            value: '4',
            label: '50%加成'
          },
          {
            value: '5',
            label: '100%加成'
          }
        ]}
        initialValue={magicAttackInitialValue}
        onChange={(value) => {
          onMagicAttackChange(value)
        }}
        label="法术攻击加成"
      />
      <GenericSelectorComponent
        options={[
          {
            value: '1',
            label: '无加成'
          },
          {
            value: '2',
            label: '10%加成'
          },
          {
            value: '3',
            label: '25%加成'
          },
          {
            value: '4',
            label: '50%加成'
          },
          {
            value: '5',
            label: '100%加成'
          }
        ]}
        initialValue={physicalAttackInitialValue}
        onChange={(value) => {
          onPhysicalAttackChange(value)
        }}
        label="物理攻击加成"
      />
      <GenericSelectorComponent
        options={[
          {
            value: '1',
            label: '无加成'
          },
          {
            value: '2',
            label: '25%加成'
          },
          {
            value: '3',
            label: '50%加成'
          },
          {
            value: '4',
            label: '80%加成'
          },
          {
            value: '5',
            label: '100%加成'
          }
        ]}
        initialValue={coolDownInitialValue}
        onChange={(value) => {
          onCoolDownChange(value)
        }}
        label="冷却缩减"
      />
      <GenericSelectorComponent
        options={[
          {
            value: '1',
            label: '无加成'
          },
          {
            value: '2',
            label: '10%加成'
          },
          {
            value: '3',
            label: '20%加成'
          },
          {
            value: '4',
            label: '30%加成'
          }
        ]}
        initialValue={speedInitialValue}
        onChange={(value) => {
          onSpeedChange(value)
        }}
        label="移速"
      />
    </div>
  );
}

type LineConfigFormComponentProps = {
  attackInitialValue: string
  healthInitialValue: string
  speedInitialValue: string
  refreshSpeedInitialValue: string
  spawnTypeInitialValue: string
  onAttackChange: (value: string) => void
  onHealthChange: (value: string) => void
  onSpeedChange: (value: string) => void
  onRefreshSpeedChange: (value: string) => void
  onSpawnTypeChange: (value: string) => void
}

function LineConfigFormComponent(props: LineConfigFormComponentProps) {
  const { attackInitialValue, healthInitialValue, speedInitialValue, 
          refreshSpeedInitialValue, spawnTypeInitialValue, onAttackChange, 
          onHealthChange, onSpeedChange, onRefreshSpeedChange, onSpawnTypeChange } = props
  return (
    <div className="space-y-2">
      <GenericSelectorComponent
        options={[
          {
            value: '1',
            label: '无加成'
          },
          {
            value: '2',
            label: '10%加成'
          },
          {
            value: '3',
            label: '25%加成'
          },
          {
            value: '4',
            label: '50%加成'
          },
          {
            value: '5',
            label: '75%加成'
          },
          {
            value: '6',
            label: '100%加成'
          }
        ]}
        initialValue={attackInitialValue}
        onChange={(value) => {
          onAttackChange(value)
        }}
        label="攻击力"
      />
      <GenericSelectorComponent
        options={[
          {
            value: '1',
            label: '无加成'
          },
          {
            value: '2',
            label: '10%加成'
          },
          {
            value: '3',
            label: '25%加成'
          },
          {
            value: '4',
            label: '50%加成'
          },
          {
            value: '5',
            label: '75%加成'
          },
          {
            value: '6',
            label: '100%加成'
          }
        ]}
        initialValue={healthInitialValue}
        onChange={(value) => {
          onHealthChange(value)
        }}
        label="血量"
      />
      <GenericSelectorComponent
        options={[
          {
            value: '1',
            label: '无加成'
          },
          {
            value: '2',
            label: '25%加成'
          },
          {
            value: '3',
            label: '50%加成'
          },
          {
            value: '4',
            label: '100%加成'
          }
        ]}
        initialValue={speedInitialValue}
        onChange={(value) => {
          onSpeedChange(value)
        }}
        label="移动速度"
      />
      <GenericSelectorComponent
        options={[
          {
            value: '1',
            label: '无加成'
          },
          {
            value: '2',
            label: '5%加成'
          },
          {
            value: '3',
            label: '10%加成'
          },
          {
            value: '4',
            label: '15%加成'
          }
        ]}
        initialValue={refreshSpeedInitialValue}
        onChange={(value) => {
          onRefreshSpeedChange(value)
        }}
        label="刷新速度"
      />
      <GenericSelectorComponent
        options={[
          {
            value: '1',
            label: '普通兵线'
          },
          {
            value: '2',
            label: '超级兵'
          },
          {
            value: '3',
            label: '主宰先锋'
          }
        ]}
        initialValue={spawnTypeInitialValue}
        onChange={(value) => {
          onSpawnTypeChange(value)
        }}
        label="出兵类型"
      />
    </div>
  )
}

type MonsterConfigFormComponentProps = {
  attackInitialValue: string
  healthInitialValue: string
  onAttackChange: (value: string) => void
  onHealthChange: (value: string) => void
}

function MonsterConfigFormComponent(props: MonsterConfigFormComponentProps) {
  const { attackInitialValue, healthInitialValue, onAttackChange, onHealthChange } = props
  return (
    <div className="space-y-2">
      <GenericSelectorComponent
        options={[
          {
            value: '1',
            label: '无加成'
          },
          {
            value: '2',
            label: '10%加成'
          },
          {
            value: '3',
            label: '25%加成'
          },
          {
            value: '4',
            label: '50%加成'
          },
          
        ]}
        initialValue={attackInitialValue}
        onChange={(value) => {
          onAttackChange(value)
        }}
        label="攻击力"
      />
      <GenericSelectorComponent
        options={[
          {
            value: '1',
            label: '无加成'
          },
          {
            value: '2',
            label: '10%加成'
          },
          {
            value: '3',
            label: '25%加成'
          },
          {
            value: '4',
            label: '50%加成'
          },
          {
            value: '5',
            label: '75%加成'
          },
          {
            value: '6',
            label: '100%加成'
          }
        ]}
        initialValue={healthInitialValue}
        onChange={(value) => {
          onHealthChange(value)
        }}
        label="血量"
      />
    </div>
  )
}

// 防御塔配置表单
type TowerConfigFormComponentProps = {
  attackInitialValue: string
  attackRangeInitialValue: string
  healthInitialValue: string    
  onAttackChange: (value: string) => void
  onAttackRangeChange: (value: string) => void
  onHealthChange: (value: string) => void
}

function TowerConfigFormComponent(props: TowerConfigFormComponentProps) {
  const { attackInitialValue, attackRangeInitialValue, healthInitialValue,
          onAttackChange, onAttackRangeChange, onHealthChange } = props
  return (
    <div className="space-y-2">
      <GenericSelectorComponent
        options={[
          {
            value: '1',
            label: '无加成'
          },
          {
            value: '2',
            label: '25%加成'
          },
          {
            value: '3',
            label: '50%加成'
          },
          {
            value: '4',
            label: '100%加成'
          }
        ]}
        initialValue={attackInitialValue}
        onChange={(value) => {
          onAttackChange(value)
        }}
        label="攻击力"
      />
      <GenericSelectorComponent
        options={[
          {
            value: '1',
            label: '无加成'
          },
          {
            value: '2',
            label: '25%加成'
          },
          {
            value: '3',
            label: '50%加成'
          }
        ]}
        initialValue={attackRangeInitialValue}
        onChange={(value) => {
          onAttackRangeChange(value)
        }}
        label="攻击范围"
      />
      <GenericSelectorComponent
        options={[
          {
            value: '1',
            label: '无加成'
          },
          {
            value: '2',
            label: '25%加成'
          },
          {
            value: '3',
            label: '50%加成'
          },
          {
            value: '4',
            label: '100%加成'
          }
        ]}
        initialValue={healthInitialValue}
        onChange={(value) => {
          onHealthChange(value)
        }}
        label="血量"
      />
    </div>
  )
}

// 水晶配置表单
type CrystalConfigFormComponentProps = {
  attackInitialValue: string
  healthInitialValue: string
  onAttackChange: (value: string) => void
  onHealthChange: (value: string) => void
}

function CrystalConfigFormComponent(props: CrystalConfigFormComponentProps) {
  const { attackInitialValue, healthInitialValue, onAttackChange, onHealthChange } = props
  return (
    <div className="space-y-2">
      <GenericSelectorComponent
        options={[
          {
            value: '1',
            label: '无加成'
          },
          {
            value: '2',
            label: '25%加成'
          },
          {
            value: '3',
            label: '50%加成'
          },
          {
            value: '4',
            label: '100%加成'
          }
        ]}
        initialValue={attackInitialValue}
        onChange={(value) => {
          onAttackChange(value)
        }}
        label="攻击力"
      />
      <GenericSelectorComponent
        options={[
          {
            value: '1',
            label: '无加成'
          },
          {
            value: '2',
            label: '25%加成'
          },
          {
            value: '3',
            label: '50%加成'
          },
          {
            value: '4',
            label: '100%加成'
          }
        ]}
        initialValue={healthInitialValue}
        onChange={(value) => {
          onHealthChange(value)
        }}
        label="血量"
      />
    </div>
  )
}

const MapModeOptions = [
  {
    value: '[1,20011,10]',
    label: '5v5标准模式'
  },
  {
    value: '[1,20911,10]',
    label: '5v5征召1ban位'
  },
  {
    value: '[1,20912,10]',
    label: '5v5征召2ban位'
  },
  {
    value: '[1,20111,10]',
    label: '5v5征召4ban位'
  }
];

type ConfigDataType = {
  mapMode: string
  banHeroNames: string[]
  customDefineSettingData: CustomDefineSettingDataType
  heroConfigType: string
  lineConfigType: string
  towerConfigType: string
}

export function loadConfigFromLocalStorage() {
  const configString = localStorage.getItem('customDefineSettingData')
  if (configString) {
    return JSON.parse(configString) as ConfigDataType
  }
  return null
}

export function saveConfigToLocalStorage(config: ConfigDataType) {
  localStorage.setItem('customDefineSettingData', JSON.stringify(config))
}

export function resetConfigToLocalStorage() {
  localStorage.removeItem('customDefineSettingData')
}

type ConfigType = {
  mapType: number
  mapID: number
  teamerNum: number
  customDefineItems: string[]
  banHerosCamp1: string[]
  banHerosCamp2: string[]
  addPos: string
  AddType: string
  OfflineRelayEntityID: string
  campid: string
  createType: string
  firstCountDownTime: string
  openAICommentator: string
  platType: string
  roomName: string
  secondCountDownTime: string
  ullExternUid: number
  ullRoomid: number
}

interface ConfigFormComponentProps {
  heroes: Hero[]
  onConfigChange?: (config: ConfigType) => void
}

export function ConfigFormComponent(props: ConfigFormComponentProps) {
  const { heroes, onConfigChange } = props
  const [customDefineSettingData, setCustomDefineSettingData] = useState<CustomDefineSettingDataType>(getCustomDefineSettingData())
  const [mapMode, setMapMode] = useState(MapModeOptions[2].value)
  const [banHeroNames, setBanHeroNames] = useState<string[]>([])
  const [gameConfigTab, setGameConfigTab] = useState('hero')
  const [heroConfigType, setHeroConfigType] = useState('global')
  const [currentPlayer, setCurrentPlayer] = useState<string>('1')
  const [lineConfigType, setLineConfigType] = useState('line-global')
  const [lineCampType, setLineCampType] = useState('line-camp-blue')
  const [towerConfigType, setTowerConfigType] = useState('tower-global')
  const [towerCampType, setTowerCampType] = useState('tower-camp-blue')

  useEffect(() => {
    const configData = loadConfigFromLocalStorage()
    if (configData) {
      setCustomDefineSettingData(configData.customDefineSettingData)
      setMapMode(configData.mapMode)
      setBanHeroNames(configData.banHeroNames)
      setHeroConfigType(configData.heroConfigType)
      setLineConfigType(configData.lineConfigType)
      setTowerConfigType(configData.towerConfigType)
    }
  }, []);

  const banHeroIDs: string[] = banHeroNames.map(name => heroes.find(hero => hero.cname === name)?.ename.toString() ?? '')

  const config = useMemo(() => {
    const customDefineItems: string[] = [];

    function addCustomDefineItem(item: CustomDefineSettingItem) {
      customDefineItems.push(...toCustomDefineItemStingList(item.index, item.value))
    }

    const [mapType, mapID, teamerNum] = JSON.parse(mapMode)

    for (const heroType of ['blue', 'red']) {
      const key = heroType as 'blue' | 'red'

      // 修改英雄属性
      for (const hero of customDefineSettingData[key].heroes) {
        // 修改英雄等级
        addCustomDefineItem(hero.level)
        // 修改英雄魔法攻击力
        addCustomDefineItem(hero.magicAttack)
        // 修改英雄物理攻击力
        addCustomDefineItem(hero.physicalAttack)
        // 修改英雄技能冷却时间
        addCustomDefineItem(hero.coolDown)
        // 修改英雄金币
        addCustomDefineItem(hero.gold)
        // 修改英雄移动速度
        addCustomDefineItem(hero.speed)
      }
      // 修改兵线攻击力
      addCustomDefineItem(customDefineSettingData[key].line.attack)
      // 修改兵线血量
      addCustomDefineItem(customDefineSettingData[key].line.health)
      // 修改兵线速度
      addCustomDefineItem(customDefineSettingData[key].line.speed)
      // 修改兵线刷新速度
      addCustomDefineItem(customDefineSettingData[key].line.refreshSpeed)
      // 修改兵线生成类型
      addCustomDefineItem(customDefineSettingData[key].line.spawnType)
    
      // 修改防御塔攻击力
      addCustomDefineItem(customDefineSettingData[key].tower.attack)
      // 修改防御塔攻击范围
      addCustomDefineItem(customDefineSettingData[key].tower.attackRange)
      // 修改防御塔血量
      addCustomDefineItem(customDefineSettingData[key].tower.health)

      // 修改野怪攻击力
      addCustomDefineItem(customDefineSettingData[key].monster.attack)
      // 修改野怪血量
      addCustomDefineItem(customDefineSettingData[key].monster.health)

      // 修改水晶攻击力
      addCustomDefineItem(customDefineSettingData[key].crystal.attack)
      // 修改水晶血量
      addCustomDefineItem(customDefineSettingData[key].crystal.health)

    }
    const ullExternUid = Math.round(Math.random() * 1000000000000000000);
    const ullRoomid = ullExternUid;
    return {
      mapType,
      mapID,
      teamerNum,
      customDefineItems,
      banHerosCamp1: banHeroIDs,
      banHerosCamp2: banHeroIDs,
      addPos: "0",
      AddType: "2",
      OfflineRelayEntityID: "",
      campid: "1",
      createType: "2",
      firstCountDownTime: "6666666666",
      openAICommentator: "1",
      platType: "2",
      roomName: "1",
      secondCountDownTime: "17",
      ullExternUid,
      ullRoomid,
    }
  }, [customDefineSettingData, mapMode, banHeroIDs])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onConfigChange?.(config)
    saveConfigToLocalStorage({
      mapMode,
      banHeroNames,
      customDefineSettingData,
      heroConfigType,
      lineConfigType,
      towerConfigType
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-200 to-red-200 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">王者荣耀自定义玩法</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="space-y-2">
              <Label htmlFor="mapMode">地图模式</Label>
              <Select onValueChange={setMapMode} value={mapMode}>
                <SelectTrigger id="mapMode">
                  <SelectValue placeholder="选择地图模式" />
                </SelectTrigger>
                <SelectContent>
                  {MapModeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>禁用英雄列表</Label>
              <BanHeroListForm 
                heroes={heroes}
                banHeroNames={banHeroNames}
                setBanHeroNames={(names) => setBanHeroNames(names)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customConfig">自定义玩法</Label>
              <Tabs
                value={gameConfigTab}
                onValueChange={setGameConfigTab}
                className="w-full justify-start bg-transparent"
              >
                <TabsList>
                  {
                    GameConfigTabs.map((tab) => (
                      <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="relative px-4 py-2 text-lg font-medium transition-colors
                          focus:outline-none focus:ring-0
                          after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:rounded-full
                          after:opacity-0 after:transition-opacity
                          data-[state=active]:after:opacity-100
                          after:bg-gradient-to-r after:from-transparent after:via-blue-300 after:to-transparent"
                      >
                        {tab.name}
                      </TabsTrigger>
                    ))
                  }
                </TabsList>
                <TabsContent value="hero">
                  <RadioGroup 
                    className='flex flex-row gap-2 justify-start py-4 pl-2'
                    value={heroConfigType}
                    onValueChange={(value) => {
                      setHeroConfigType(value)
                    }}
                  >
                    <div className='flex flex-row gap-2 justify-start'>
                      <RadioGroupItem value="global" id="global" />
                      <Label htmlFor="global">全局统一</Label>
                    </div>
                    <div className='flex flex-row gap-2 justify-start'>
                      <RadioGroupItem value="camp" id="camp" />
                      <Label htmlFor="camp">按阵营</Label>
                    </div>
                    <div className='flex flex-row gap-2 justify-start'>
                      <RadioGroupItem value="player" id="player" />
                      <Label htmlFor="player">按选手</Label>
                    </div>
                  </RadioGroup>
                  <Tabs value={heroConfigType}>
                    <TabsContent value="global">
                      <HeroConfigFormComponent
                        levelInitialValue={customDefineSettingData.blue.heroes[0].level.value}
                        magicAttackInitialValue={customDefineSettingData.blue.heroes[0].magicAttack.value}
                        physicalAttackInitialValue={customDefineSettingData.blue.heroes[0].physicalAttack.value}
                        coolDownInitialValue={customDefineSettingData.blue.heroes[0].coolDown.value}
                        speedInitialValue={customDefineSettingData.blue.heroes[0].speed.value}
                        onLevelChange={(value) => {
                          setCustomDefineSettingData({
                            ...customDefineSettingData,
                            blue: {
                              ...customDefineSettingData.blue,
                              heroes: customDefineSettingData.blue.heroes.map(hero => ({
                                ...hero,
                                level: { ...hero.level, value }
                              }))
                            },
                            red: {
                              ...customDefineSettingData.red,
                              heroes: customDefineSettingData.red.heroes.map(hero => ({
                                ...hero,
                                level: { ...hero.level, value }
                              }))
                            }
                          })
                        }}
                        onMagicAttackChange={(value) => {
                          setCustomDefineSettingData({
                            ...customDefineSettingData,
                            blue: {
                              ...customDefineSettingData.blue,
                              heroes: customDefineSettingData.blue.heroes.map(hero => ({
                                ...hero,
                                magicAttack: { ...hero.magicAttack, value }
                              }))
                            },
                            red: {
                              ...customDefineSettingData.red,
                              heroes: customDefineSettingData.red.heroes.map(hero => ({
                                ...hero,
                                magicAttack: { ...hero.magicAttack, value }
                              }))
                            }
                          })
                        }}
                        onPhysicalAttackChange={(value) => {
                          setCustomDefineSettingData({
                            ...customDefineSettingData,
                            blue: {
                              ...customDefineSettingData.blue,
                              heroes: customDefineSettingData.blue.heroes.map(hero => ({
                                ...hero,
                                physicalAttack: { ...hero.physicalAttack, value }
                              }))
                            },
                            red: {
                              ...customDefineSettingData.red,
                              heroes: customDefineSettingData.red.heroes.map(hero => ({
                                ...hero,
                                physicalAttack: { ...hero.physicalAttack, value }
                              }))
                            }
                          })
                        }}
                        onCoolDownChange={(value) => {
                          setCustomDefineSettingData({
                            ...customDefineSettingData,
                            blue: {
                              ...customDefineSettingData.blue,
                              heroes: customDefineSettingData.blue.heroes.map(hero => ({
                                ...hero,
                                coolDown: { ...hero.coolDown, value }
                              }))
                            },
                            red: {
                              ...customDefineSettingData.red,
                              heroes: customDefineSettingData.red.heroes.map(hero => ({
                                ...hero,
                                coolDown: { ...hero.coolDown, value }
                              }))
                            }
                          })
                        }}
                        onSpeedChange={(value) => {
                          setCustomDefineSettingData({
                            ...customDefineSettingData,
                            blue: {
                              ...customDefineSettingData.blue,
                              heroes: customDefineSettingData.blue.heroes.map(hero => ({
                                ...hero,
                                speed: { ...hero.speed, value }
                              }))
                            },
                            red: {
                              ...customDefineSettingData.red,
                              heroes: customDefineSettingData.red.heroes.map(hero => ({
                                ...hero,
                                speed: { ...hero.speed, value }
                              }))
                            }
                          })
                        }}
                      />
                    </TabsContent>
                    <TabsContent value="camp" className="space-y-4">
                      <div className="space-y-2 p-2">
                        <Label>蓝方英雄属性</Label>
                        <HeroConfigFormComponent
                          levelInitialValue={customDefineSettingData.blue.heroes[0].level.value}
                          magicAttackInitialValue={customDefineSettingData.blue.heroes[0].magicAttack.value}
                          physicalAttackInitialValue={customDefineSettingData.blue.heroes[0].physicalAttack.value}
                          coolDownInitialValue={customDefineSettingData.blue.heroes[0].coolDown.value}
                          speedInitialValue={customDefineSettingData.blue.heroes[0].speed.value}
                          onLevelChange={(value) => {
                            setCustomDefineSettingData({
                              ...customDefineSettingData,
                              blue: {
                                ...customDefineSettingData.blue,
                                heroes: customDefineSettingData.blue.heroes.map(hero => ({
                                  ...hero,
                                  level: { ...hero.level, value }
                                }))
                              }
                            })
                          }}
                          onMagicAttackChange={(value) => {
                            setCustomDefineSettingData({
                              ...customDefineSettingData,
                              blue: {
                                ...customDefineSettingData.blue,
                                heroes: customDefineSettingData.blue.heroes.map(hero => ({
                                  ...hero,
                                  magicAttack: { ...hero.magicAttack, value }
                                }))
                              }
                            })
                          }}
                          onPhysicalAttackChange={(value) => {
                            setCustomDefineSettingData({
                              ...customDefineSettingData,
                              blue: {
                                ...customDefineSettingData.blue,
                                heroes: customDefineSettingData.blue.heroes.map(hero => ({
                                  ...hero,
                                  physicalAttack: { ...hero.physicalAttack, value }
                                }))
                              }
                            })
                          }}
                          onCoolDownChange={(value) => {
                            setCustomDefineSettingData({
                              ...customDefineSettingData,
                              blue: {
                                ...customDefineSettingData.blue,
                                heroes: customDefineSettingData.blue.heroes.map(hero => ({
                                  ...hero,
                                  coolDown: { ...hero.coolDown, value }
                                }))
                              }
                            })
                          }}
                          onSpeedChange={(value) => {
                            setCustomDefineSettingData({
                              ...customDefineSettingData,
                              blue: {
                                ...customDefineSettingData.blue,
                                heroes: customDefineSettingData.blue.heroes.map(hero => ({
                                  ...hero,
                                  speed: { ...hero.speed, value }
                                }))
                              }
                            })
                          }}
                        />
                      </div>
                      <div className="space-y-2 p-2">
                        <Label>红方英雄属性</Label>
                        <HeroConfigFormComponent
                          levelInitialValue={customDefineSettingData.red.heroes[0].level.value}
                          magicAttackInitialValue={customDefineSettingData.red.heroes[0].magicAttack.value}
                          physicalAttackInitialValue={customDefineSettingData.red.heroes[0].physicalAttack.value}
                          coolDownInitialValue={customDefineSettingData.red.heroes[0].coolDown.value}
                          speedInitialValue={customDefineSettingData.red.heroes[0].speed.value}
                          onLevelChange={(value) => {
                            setCustomDefineSettingData({
                              ...customDefineSettingData,
                              red: {
                                ...customDefineSettingData.red,
                                heroes: customDefineSettingData.red.heroes.map(hero => ({
                                  ...hero,
                                  level: { ...hero.level, value }
                                }))
                              }
                            })
                          }}
                          onMagicAttackChange={(value) => {
                            setCustomDefineSettingData({
                              ...customDefineSettingData,
                              red: {
                                ...customDefineSettingData.red,
                                heroes: customDefineSettingData.red.heroes.map(hero => ({
                                  ...hero,
                                  magicAttack: { ...hero.magicAttack, value }
                                }))
                              }
                            })
                          }}
                          onPhysicalAttackChange={(value) => {
                            setCustomDefineSettingData({
                              ...customDefineSettingData,
                              red: {
                                ...customDefineSettingData.red,
                                heroes: customDefineSettingData.red.heroes.map(hero => ({
                                  ...hero,
                                  physicalAttack: { ...hero.physicalAttack, value }
                                }))
                              }
                            })
                          }}
                          onCoolDownChange={(value) => {
                            setCustomDefineSettingData({
                              ...customDefineSettingData,
                              red: {
                                ...customDefineSettingData.red,
                                heroes: customDefineSettingData.red.heroes.map(hero => ({
                                  ...hero,
                                  coolDown: { ...hero.coolDown, value }
                                }))
                              }
                            })
                          }}
                          onSpeedChange={(value) => {
                            setCustomDefineSettingData({
                              ...customDefineSettingData,
                              red: {
                                ...customDefineSettingData.red,
                                heroes: customDefineSettingData.red.heroes.map(hero => ({
                                  ...hero,
                                  speed: { ...hero.speed, value }
                                }))
                              }
                            })
                          }}
                        />
                      </div>
                    </TabsContent>
                    <TabsContent value="player">
                      <div className="space-y-2">
                      <RadioGroup 
                        className='flex flex-row justify-start'
                        value={currentPlayer}
                        onValueChange={(value) => {
                          setCurrentPlayer(value)
                        }}
                      >
                          {["1", "2", "3", "4", "5"].map((value) => (
                            <div className='flex flex-row gap-2 justify-start' key={value}>
                              <RadioGroupItem value={value} id={value} />
                              <Label htmlFor={value}>{value}号</Label>
                            </div>
                          ))}
                        </RadioGroup>
                        <Tabs value={currentPlayer}>
                          {["1", "2", "3", "4", "5"].map((value, index) => (
                            <TabsContent value={value} key={value}>
                              <div className="space-y-2 p-2">
                                <Label>蓝方{value}号英雄属性</Label>
                                <HeroConfigFormComponent
                                  levelInitialValue={customDefineSettingData.blue.heroes[index].level.value}
                                  magicAttackInitialValue={customDefineSettingData.blue.heroes[index].magicAttack.value}
                                  physicalAttackInitialValue={customDefineSettingData.blue.heroes[index].physicalAttack.value}
                                  coolDownInitialValue={customDefineSettingData.blue.heroes[index].coolDown.value}
                                  speedInitialValue={customDefineSettingData.blue.heroes[index].speed.value}
                                  onLevelChange={(value) => {
                                    customDefineSettingData.blue.heroes[index].level.value = value
                                    setCustomDefineSettingData({
                                      ...customDefineSettingData
                                    })
                                  }}
                                  onMagicAttackChange={(value) => {
                                    customDefineSettingData.blue.heroes[index].magicAttack.value = value
                                    setCustomDefineSettingData({
                                      ...customDefineSettingData
                                    })
                                  }}
                                  onPhysicalAttackChange={(value) => {
                                    customDefineSettingData.blue.heroes[index].physicalAttack.value = value
                                    setCustomDefineSettingData({
                                      ...customDefineSettingData
                                    })
                                  }}
                                  onCoolDownChange={(value) => {
                                    customDefineSettingData.blue.heroes[index].coolDown.value = value
                                    setCustomDefineSettingData({
                                      ...customDefineSettingData
                                    })
                                  }}
                                  onSpeedChange={(value) => {
                                    customDefineSettingData.blue.heroes[index].speed.value = value
                                    setCustomDefineSettingData({
                                      ...customDefineSettingData
                                    })
                                  }}
                                />
                              </div>
                              <div className="space-y-2 p-2">
                                <Label>红方{value}号英雄属性</Label>
                                <HeroConfigFormComponent
                                  levelInitialValue={customDefineSettingData.red.heroes[index].level.value}
                                  magicAttackInitialValue={customDefineSettingData.red.heroes[index].magicAttack.value}
                                  physicalAttackInitialValue={customDefineSettingData.red.heroes[index].physicalAttack.value}
                                  coolDownInitialValue={customDefineSettingData.red.heroes[index].coolDown.value}
                                  speedInitialValue={customDefineSettingData.red.heroes[index].speed.value}
                                  onLevelChange={(value) => {
                                    customDefineSettingData.red.heroes[index].level.value = value
                                    setCustomDefineSettingData({
                                      ...customDefineSettingData
                                    })
                                  }}
                                  onMagicAttackChange={(value) => {
                                    customDefineSettingData.red.heroes[index].magicAttack.value = value
                                    setCustomDefineSettingData({
                                      ...customDefineSettingData
                                    })
                                  }}
                                  onPhysicalAttackChange={(value) => {
                                    customDefineSettingData.red.heroes[index].physicalAttack.value = value
                                    setCustomDefineSettingData({
                                      ...customDefineSettingData
                                    })
                                  }}
                                  onCoolDownChange={(value) => {
                                    customDefineSettingData.red.heroes[index].coolDown.value = value
                                    setCustomDefineSettingData({
                                      ...customDefineSettingData
                                    })
                                  }}
                                  onSpeedChange={(value) => {
                                    customDefineSettingData.red.heroes[index].speed.value = value
                                    setCustomDefineSettingData({
                                      ...customDefineSettingData
                                    })
                                  }}
                                />
                              </div>
                            </TabsContent>
                          ))}
                        </Tabs>
                      </div>
                    </TabsContent>
                  </Tabs>
                </TabsContent>
                <TabsContent value="line">
                    <RadioGroup 
                      className='flex flex-row gap-2 justify-start py-4 pl-2'
                      value={lineConfigType}
                      onValueChange={(value) => {
                        setLineConfigType(value)
                      }}
                    >
                      <div className='flex flex-row gap-2 justify-start'>
                        <RadioGroupItem value="line-global" id="line-global" />
                        <Label htmlFor="line-global">全局统一</Label>
                      </div>
                      <div className='flex flex-row gap-2 justify-start'>
                        <RadioGroupItem value="line-camp" id="line-camp" />
                        <Label htmlFor="line-camp">按阵营</Label>
                      </div>
                    </RadioGroup>
                    <Tabs
                      value={lineConfigType}
                    >
                      <TabsContent value="line-global">
                        <div className='space-y-4'>
                          <div className="space-y-2 p-2">
                            <Label>兵线属性</Label>
                            <LineConfigFormComponent
                              attackInitialValue={customDefineSettingData.blue.line.attack.value}
                              healthInitialValue={customDefineSettingData.blue.line.health.value}
                              speedInitialValue={customDefineSettingData.blue.line.speed.value}
                              refreshSpeedInitialValue={customDefineSettingData.blue.line.refreshSpeed.value}
                              spawnTypeInitialValue={customDefineSettingData.blue.line.spawnType.value}
                              onAttackChange={(value) => {
                                customDefineSettingData.blue.line.attack.value = value
                                customDefineSettingData.red.line.attack.value = value
                                setCustomDefineSettingData({
                                  ...customDefineSettingData
                                })
                              }}
                              onHealthChange={(value) => {
                                customDefineSettingData.blue.line.health.value = value
                                customDefineSettingData.red.line.health.value = value
                                setCustomDefineSettingData({
                                  ...customDefineSettingData
                                })
                              }}
                              onSpeedChange={(value) => {
                                customDefineSettingData.blue.line.speed.value = value
                                customDefineSettingData.red.line.speed.value = value
                                setCustomDefineSettingData({
                                  ...customDefineSettingData
                                })
                              }}
                              onRefreshSpeedChange={(value) => {
                                customDefineSettingData.blue.line.refreshSpeed.value = value
                                customDefineSettingData.red.line.refreshSpeed.value = value
                                setCustomDefineSettingData({
                                  ...customDefineSettingData
                                })
                              }}
                              onSpawnTypeChange={(value) => {
                                customDefineSettingData.blue.line.spawnType.value = value
                                customDefineSettingData.red.line.spawnType.value = value
                                setCustomDefineSettingData({
                                  ...customDefineSettingData
                                })
                              }}
                            />
                          </div>
                          <div className="space-y-2 p-2">
                            <Label>野怪属性</Label>
                            <MonsterConfigFormComponent
                              attackInitialValue={customDefineSettingData.blue.monster.attack.value}
                              healthInitialValue={customDefineSettingData.blue.monster.health.value}
                              onAttackChange={(value) => {
                                customDefineSettingData.blue.monster.attack.value = value
                                customDefineSettingData.red.monster.attack.value = value
                                setCustomDefineSettingData({
                                  ...customDefineSettingData
                                })
                              }}
                              onHealthChange={(value) => {
                                customDefineSettingData.blue.monster.health.value = value
                                customDefineSettingData.red.monster.health.value = value
                                setCustomDefineSettingData({
                                  ...customDefineSettingData
                                })
                              }}
                            />
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="line-camp">
                        <RadioGroup 
                          className='flex flex-row gap-2 justify-start pl-2'
                          value={lineCampType}
                          onValueChange={(value) => {
                            setLineCampType(value)
                          }}
                        >
                          <div className='flex flex-row gap-2 justify-start'>
                            <RadioGroupItem value="line-camp-blue" id="line-camp-blue" />
                            <Label htmlFor="line-camp-blue">蓝方</Label>
                          </div>
                          <div className='flex flex-row gap-2 justify-start'>
                            <RadioGroupItem value="line-camp-red" id="line-camp-red" />
                            <Label htmlFor="line-camp-red">红方</Label>
                          </div>
                        </RadioGroup>
                        <Tabs value={lineCampType}>
                          {["blue", "red"].map((key) => (
                            <TabsContent value={`line-camp-${key}`} key={key}>
                              <div className="space-y-4">
                                <div className="space-y-2 p-2">
                                  <Label>{key === "blue" ? "蓝方" : "红方"}兵线属性</Label>
                                  <LineConfigFormComponent
                                    attackInitialValue={customDefineSettingData[key as 'blue' | 'red'].line.attack.value}
                                    healthInitialValue={customDefineSettingData[key as 'blue' | 'red'].line.health.value}
                                    speedInitialValue={customDefineSettingData[key as 'blue' | 'red'].line.speed.value}
                                    refreshSpeedInitialValue={customDefineSettingData[key as 'blue' | 'red'].line.refreshSpeed.value}
                                    spawnTypeInitialValue={customDefineSettingData[key as 'blue' | 'red'].line.spawnType.value}
                                    onAttackChange={(value) => {
                                      customDefineSettingData[key as 'blue' | 'red'].line.attack.value = value
                                      setCustomDefineSettingData({
                                        ...customDefineSettingData
                                      })
                                    }}
                                    onHealthChange={(value) => {
                                      customDefineSettingData[key as 'blue' | 'red'].line.health.value = value
                                      setCustomDefineSettingData({
                                        ...customDefineSettingData
                                      })
                                    }}
                                    onSpeedChange={(value) => {
                                      customDefineSettingData[key as 'blue' | 'red'].line.speed.value = value
                                      setCustomDefineSettingData({
                                        ...customDefineSettingData
                                      })
                                    }}
                                    onRefreshSpeedChange={(value) => {
                                      customDefineSettingData[key as 'blue' | 'red'].line.refreshSpeed.value = value
                                      setCustomDefineSettingData({
                                        ...customDefineSettingData
                                      })
                                    }}
                                    onSpawnTypeChange={(value) => {
                                      customDefineSettingData[key as 'blue' | 'red'].line.spawnType.value = value
                                      setCustomDefineSettingData({
                                        ...customDefineSettingData
                                      })
                                    }}
                                  />
                                </div>
                                <div className="space-y-2 p-2">
                                  <Label>{key === "blue" ? "蓝方" : "红方"}野怪属性</Label>
                                  <MonsterConfigFormComponent
                                    attackInitialValue={customDefineSettingData[key as 'blue' | 'red'].monster.attack.value}
                                    healthInitialValue={customDefineSettingData[key as 'blue' | 'red'].monster.health.value}
                                    onAttackChange={(value) => {
                                      customDefineSettingData[key as 'blue' | 'red'].monster.attack.value = value
                                      setCustomDefineSettingData({
                                        ...customDefineSettingData
                                      })
                                    }}
                                    onHealthChange={(value) => {
                                      customDefineSettingData[key as 'blue' | 'red'].monster.health.value = value
                                      setCustomDefineSettingData({
                                        ...customDefineSettingData
                                      })
                                    }}
                                  />
                                </div>
                              </div>
                            </TabsContent>
                          ))}
                        </Tabs>
                      </TabsContent>
                    </Tabs>
                </TabsContent>
                <TabsContent value="tower">
                    <RadioGroup 
                        className='flex flex-row gap-2 justify-start py-4 pl-2'
                        value={towerConfigType}
                        onValueChange={(value) => {
                          setTowerConfigType(value)
                        }}
                      >
                        <div className='flex flex-row gap-2 justify-start'>
                          <RadioGroupItem value="tower-global" id="tower-global" />
                          <Label htmlFor="tower-global">全局统一</Label>
                        </div>
                        <div className='flex flex-row gap-2 justify-start'>
                          <RadioGroupItem value="tower-camp" id="tower-camp" />
                          <Label htmlFor="tower-camp">按阵营</Label>
                        </div>
                    </RadioGroup>
                    <Tabs value={towerConfigType}>
                      <TabsContent value="tower-global">
                        <div className="space-y-4">
                          <div className="space-y-2 p-2">
                            <Label>防御塔属性</Label>
                            <TowerConfigFormComponent
                              attackInitialValue={customDefineSettingData.blue.tower.attack.value}
                              healthInitialValue={customDefineSettingData.blue.tower.health.value}
                              attackRangeInitialValue={customDefineSettingData.blue.tower.attackRange.value}
                              onAttackChange={(value) => {
                                customDefineSettingData.blue.tower.attack.value = value
                                setCustomDefineSettingData({
                                  ...customDefineSettingData
                                })
                              }}
                              onAttackRangeChange={(value) => {
                                customDefineSettingData.blue.tower.attackRange.value = value
                                setCustomDefineSettingData({
                                  ...customDefineSettingData
                                })
                              }}
                              onHealthChange={(value) => {
                                customDefineSettingData.blue.tower.health.value = value
                                setCustomDefineSettingData({
                                  ...customDefineSettingData
                                })
                              }}
                            />
                          </div>
                          <div className="space-y-2 p-2">
                            <Label>水晶属性</Label>
                            <CrystalConfigFormComponent
                              attackInitialValue={customDefineSettingData.blue.crystal.attack.value}
                              healthInitialValue={customDefineSettingData.blue.crystal.health.value}
                              onAttackChange={(value) => {
                                customDefineSettingData.blue.crystal.attack.value = value
                                setCustomDefineSettingData({
                                  ...customDefineSettingData
                                })
                              }}
                              onHealthChange={(value) => {
                                customDefineSettingData.blue.crystal.health.value = value
                                setCustomDefineSettingData({
                                  ...customDefineSettingData
                                })
                              }}
                            />
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="tower-camp">
                        <RadioGroup 
                            className='flex flex-row gap-2 justify-start py-4 pl-2'
                            value={towerCampType}
                            onValueChange={(value) => {
                              setTowerCampType(value)
                            }}
                          >
                            <div className='flex flex-row gap-2 justify-start'>
                              <RadioGroupItem value="tower-camp-blue" id="tower-camp-blue" />
                              <Label htmlFor="tower-camp-blue">蓝方</Label>
                            </div>
                            <div className='flex flex-row gap-2 justify-start'>
                              <RadioGroupItem value="tower-camp-red" id="tower-camp-red" />
                              <Label htmlFor="tower-camp-red">红方</Label>
                            </div>
                        </RadioGroup>
                        <Tabs value={towerCampType}>
                          {["blue", "red"].map((key) => (
                            <TabsContent value={`tower-camp-${key}`} key={key}>
                              <div className="space-y-2">
                                <div className="space-y-2">
                                  <Label>{key === "blue" ? "蓝方" : "红方"}防御塔属性</Label>
                                  <TowerConfigFormComponent
                                    attackInitialValue={customDefineSettingData[key as 'blue' | 'red'].tower.attack.value}
                                    healthInitialValue={customDefineSettingData[key as 'blue' | 'red'].tower.health.value}
                                    attackRangeInitialValue={customDefineSettingData[key as 'blue' | 'red'].tower.attackRange.value}
                                    onAttackChange={(value) => {
                                      customDefineSettingData[key as 'blue' | 'red'].tower.attack.value = value
                                      setCustomDefineSettingData({
                                        ...customDefineSettingData
                                      })
                                    }}
                                    onAttackRangeChange={(value) => {
                                      customDefineSettingData[key as 'blue' | 'red'].tower.attackRange.value = value
                                      setCustomDefineSettingData({
                                        ...customDefineSettingData
                                      })
                                    }}
                                    onHealthChange={(value) => {
                                      customDefineSettingData[key as 'blue' | 'red'].tower.health.value = value
                                      setCustomDefineSettingData({
                                        ...customDefineSettingData
                                      })
                                    }}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>{key === "blue" ? "蓝方" : "红方"}水晶属性</Label>
                                  <CrystalConfigFormComponent
                                    attackInitialValue={customDefineSettingData[key as 'blue' | 'red'].crystal.attack.value}
                                    healthInitialValue={customDefineSettingData[key as 'blue' | 'red'].crystal.health.value}
                                    onAttackChange={(value) => {
                                      customDefineSettingData[key as 'blue' | 'red'].crystal.attack.value = value
                                      setCustomDefineSettingData({
                                        ...customDefineSettingData
                                      })
                                    }}
                                    onHealthChange={(value) => {
                                      customDefineSettingData[key as 'blue' | 'red'].crystal.health.value = value
                                      setCustomDefineSettingData({
                                        ...customDefineSettingData
                                      })
                                    }}
                                  />
                                </div>
                              </div>
                            </TabsContent>
                          ))}
                        </Tabs>
                      </TabsContent>
                    </Tabs>
                </TabsContent>
              </Tabs>
            </div>

            <div className="flex flex-row justify-between gap-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  className='w-1/2'
                  onClick={() => {
                    setBanHeroNames([])
                    setCustomDefineSettingData(getCustomDefineSettingData())
                    setGameConfigTab('hero')
                    setHeroConfigType('global')
                    setCurrentPlayer('1')
                    setLineConfigType('line-global')
                    setTowerConfigType('tower-global')
                    setTowerCampType('tower-camp-blue')
                    resetConfigToLocalStorage()
                  }}
                >
                  重置
                </Button>
                <Button type="submit" className='w-1/2'>
                  保存
                </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}