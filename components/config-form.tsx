"use client"

import { useState, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { HeroType, type Hero } from "@/types/hero"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Check } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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
import { Mode, CustomDefineSettingDataType } from '@/types/mode'
import { generateDefaultMode, MapModeOptions } from '@/lib/mode'

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
  // 仅坦克
  const [onlyTank, setOnlyTank] = useState(false)

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
          <div className="flex flex-col space-y-2 py-4">
            <span className="text-sm font-medium">快捷禁用:</span>
            <div className="grid grid-cols-3 gap-4">
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
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="only-tank"
                  checked={onlyTank}
                  onCheckedChange={(checked) => {
                    setOnlyTank(checked as boolean);
                    if (checked) {
                      setBanHeroNames(heroes.filter(hero => ![hero.hero_type, hero.hero_type2].includes(HeroType.Tank)).map(hero => hero.cname))
                    } else {
                      setBanHeroNames([])
                    }
                  }}
                />
                <label
                  htmlFor="only-tank"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  仅坦克
                </label>
              </div>
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
                            <img
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

// 英雄修改属性表单
type HeroConfigFormComponentProps = {
  levelInitialValue: string
  magicAttackInitialValue: string
  physicalAttackInitialValue: string
  coolDownInitialValue: string
  speedInitialValue: string
  goldInitialValue: string
  onLevelChange: (value: string) => void
  onMagicAttackChange: (value: string) => void
  onPhysicalAttackChange: (value: string) => void
  onCoolDownChange: (value: string) => void
  onSpeedChange: (value: string) => void
  onGoldChange: (value: string) => void
}

function HeroConfigFormComponent(props: HeroConfigFormComponentProps) {
  const { levelInitialValue, magicAttackInitialValue, 
          physicalAttackInitialValue, coolDownInitialValue, 
          speedInitialValue, goldInitialValue, onLevelChange, onMagicAttackChange, 
          onPhysicalAttackChange, onCoolDownChange, onSpeedChange, onGoldChange } = props
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
            label: '1000'
          },
          {
            value: '3',
            label: '2000'
          },
          {
            value: '4',
            label: '5000'
          },
          {
            value: '5',
            label: '12000'
          }
        ]}
        initialValue={goldInitialValue}
        onChange={(value) => {
          onGoldChange(value)
        }}
        label="初始金币"
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
            label: '75%加成'
          },
          {
            value: '6',
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
            label: '99%加成'
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


export interface ConfigFormProps {
  heroes: Hero[]
  onModeChange?: (mode: Mode) => void
  currentMode?: Mode // 可选的初始配置
}

export default function ConfigFormComponent({ heroes, onModeChange, currentMode }: ConfigFormProps) {
  const mode: Mode = currentMode || generateDefaultMode()
  const [customDefineSettingData, setCustomDefineSettingData] = useState<CustomDefineSettingDataType>(mode.settings.customDefineSettingData)
  const [mapMode, setMapMode] = useState(mode.settings.mapMode)
  const [banHeroNames, setBanHeroNames] = useState<string[]>(mode.settings.banHeroNames)
  const [gameConfigTab, setGameConfigTab] = useState('hero')
  const [heroConfigType, setHeroConfigType] = useState('global')
  const [currentPlayer, setCurrentPlayer] = useState<string>('1')
  const [lineConfigType, setLineConfigType] = useState('line-global')
  const [lineCampType, setLineCampType] = useState('line-camp-blue')
  const [towerConfigType, setTowerConfigType] = useState('tower-global')
  const [towerCampType, setTowerCampType] = useState('tower-camp-blue')
  const [name, setName] = useState(mode.name)
  const [description, setDescription] = useState(mode.description)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onModeChange?.({
      id: '',
      name,
      description,
      settings: {
        mapMode,
        banHeroNames,
        customDefineSettingData,
        heroConfigType,
        lineConfigType,
        towerConfigType
      }
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
              <Label htmlFor="configName">模式名称</Label>
              <Input
                id="configName"
                placeholder="请输入模式名称"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="configDescription">模式描述</Label>
              <Input
                id="configDescription"
                placeholder="请输入模式描述(选填)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

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
                        goldInitialValue={customDefineSettingData.blue.heroes[0].gold.value}
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
                        onGoldChange={(value) => {
                          setCustomDefineSettingData({
                            ...customDefineSettingData,
                            blue: {
                              ...customDefineSettingData.blue,
                              heroes: customDefineSettingData.blue.heroes.map(hero => ({
                                ...hero,
                                gold: { ...hero.gold, value }
                              }))
                            },
                            red: {
                              ...customDefineSettingData.red,
                              heroes: customDefineSettingData.red.heroes.map(hero => ({
                                ...hero,
                                gold: { ...hero.gold, value }
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
                          goldInitialValue={customDefineSettingData.blue.heroes[0].gold.value}
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
                          onGoldChange={(value) => {
                            setCustomDefineSettingData({
                              ...customDefineSettingData,
                              blue: {
                                ...customDefineSettingData.blue,
                                heroes: customDefineSettingData.blue.heroes.map(hero => ({
                                  ...hero,
                                  gold: { ...hero.gold, value }
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
                          goldInitialValue={customDefineSettingData.red.heroes[0].gold.value}
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
                          onGoldChange={(value) => {
                            setCustomDefineSettingData({
                              ...customDefineSettingData,
                              red: {
                                ...customDefineSettingData.red,
                                heroes: customDefineSettingData.red.heroes.map(hero => ({
                                  ...hero,
                                  gold: { ...hero.gold, value }
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
                                  goldInitialValue={customDefineSettingData.blue.heroes[index].gold.value}
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
                                  onGoldChange={(value) => {
                                    customDefineSettingData.blue.heroes[index].gold.value = value
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
                                  goldInitialValue={customDefineSettingData.red.heroes[index].gold.value}
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
                                  onGoldChange={(value) => {
                                    customDefineSettingData.red.heroes[index].gold.value = value
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
                                customDefineSettingData.red.tower.attack.value = value
                                setCustomDefineSettingData({
                                  ...customDefineSettingData
                                })
                              }}
                              onAttackRangeChange={(value) => {
                                customDefineSettingData.blue.tower.attackRange.value = value
                                customDefineSettingData.red.tower.attackRange.value = value
                                setCustomDefineSettingData({
                                  ...customDefineSettingData
                                })
                              }}
                              onHealthChange={(value) => {
                                customDefineSettingData.blue.tower.health.value = value
                                customDefineSettingData.red.tower.health.value = value
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
                                customDefineSettingData.red.crystal.attack.value = value
                                setCustomDefineSettingData({
                                  ...customDefineSettingData
                                })
                              }}
                              onHealthChange={(value) => {
                                customDefineSettingData.blue.crystal.health.value = value
                                customDefineSettingData.red.crystal.health.value = value
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
                    const mode = generateDefaultMode()
                    setName(mode.name)  // 重置名称
                    setBanHeroNames(mode.settings.banHeroNames)
                    setCustomDefineSettingData(mode.settings.customDefineSettingData)
                    setGameConfigTab('hero')
                    setHeroConfigType(mode.settings.heroConfigType)
                    setCurrentPlayer('1')
                    setLineConfigType(mode.settings.lineConfigType)
                    setTowerConfigType(mode.settings.towerConfigType)
                    setTowerCampType('tower-camp-blue')
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