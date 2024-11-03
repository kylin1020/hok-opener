import { Mode, GameConfig, CustomDefineSettingItem } from "@/types/mode"
import { Hero } from "@/types/hero"


// 根据模式设置生成游戏配置
export function generateGameConfigFromMode(mode: Mode, heroes: Hero[]): GameConfig {
    const { settings } = mode
    const { mapMode, banHeroNames, customDefineSettingData } = settings

    // 将英雄名称转换为ID
    const banHeroIDs: string[] = banHeroNames.map(name => {
        const hero = heroes.find((hero: Hero) => hero.cname === name)
        return hero?.ename.toString() ?? ''
    }).filter(id => id !== '')

    const [mapType, mapID, teamerNum] = JSON.parse(mapMode)

    // 生成自定义配置项
  const customDefineItems: string[] = []
  
  function addCustomDefineItem(item: CustomDefineSettingItem) {
    if (Array.isArray(item.index)) {
      item.index.forEach(i => customDefineItems.push(`${i}:${item.value}`))
    } else {
      customDefineItems.push(`${item.index}:${item.value}`)
    }
  }

  // 遍历两个阵营的配置
  for (const camp of ['blue', 'red'] as const) {
    // 添加英雄相关配置
    for (const hero of customDefineSettingData[camp].heroes) {
      addCustomDefineItem(hero.level)
      addCustomDefineItem(hero.magicAttack) 
      addCustomDefineItem(hero.physicalAttack)
      addCustomDefineItem(hero.coolDown)
      addCustomDefineItem(hero.gold)
      addCustomDefineItem(hero.speed)
    }

    // 添加兵线配置
    addCustomDefineItem(customDefineSettingData[camp].line.attack)
    addCustomDefineItem(customDefineSettingData[camp].line.health)
    addCustomDefineItem(customDefineSettingData[camp].line.speed)
    addCustomDefineItem(customDefineSettingData[camp].line.refreshSpeed)
    addCustomDefineItem(customDefineSettingData[camp].line.spawnType)

    // 添加防御塔配置
    addCustomDefineItem(customDefineSettingData[camp].tower.attack)
    addCustomDefineItem(customDefineSettingData[camp].tower.attackRange)
    addCustomDefineItem(customDefineSettingData[camp].tower.health)

    // 添加野怪配置
    addCustomDefineItem(customDefineSettingData[camp].monster.attack)
    addCustomDefineItem(customDefineSettingData[camp].monster.health)

    // 添加水晶配置
    addCustomDefineItem(customDefineSettingData[camp].crystal.attack)
    addCustomDefineItem(customDefineSettingData[camp].crystal.health)
  }

  // 生成随机ID
  const ullExternUid = Math.round(Math.random() * 1000000000000000000)
  const ullRoomid = ullExternUid

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
    ullRoomid
  }
}

export const MapModeType = {
  Standard: "[1,20011,10]",
  OneBan: "[1,20911,10]",
  TwoBan: "[1,20912,10]",
  ThreeBan: "[1,20913,10]",
  FourBan: "[1,20914,10]",
}

export const MapModeOptions = [
    {
      value: MapModeType.Standard,
      label: '5v5标准模式'
    },
    {
      value: MapModeType.OneBan,
      label: '5v5征召1ban位'
    },
    {
      value: MapModeType.TwoBan,
      label: '5v5征召2ban位'
    },
    {
      value: MapModeType.FourBan,
      label: '5v5征召4ban位'
    }
  ];


// 生成默认的模式参数
export function generateDefaultMode(): Mode {
    return {
        id: '',
        name: '自定义模式',
        description: '自定义模式',
        settings: {
            mapMode: MapModeOptions[2].value,
            banHeroNames: [],
            customDefineSettingData: {
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
            },
            heroConfigType: '1',
            lineConfigType: '1',
            towerConfigType: '1'
        }
    }
}