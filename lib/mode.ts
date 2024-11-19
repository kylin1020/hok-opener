import { Mode, GameConfig, CustomDefineSettingItem } from "@/types/mode"
import { Hero } from "@/types/hero"


// 根据模式设置生成游戏配置
export function generateGameConfigFromMode(mode: Mode, heroes: Hero[], roomNo: number, isFirstJoin?: boolean, team: "blue" | "red" | undefined = "blue", onlyJoinRoom: boolean = false): GameConfig {
    const { settings } = mode
    const { mapMode, banHeroNames, customDefineSettingData } = settings

    const [mapType, mapID, teamerNum] = JSON.parse(mapMode)

    const ullExternUid = roomNo
    const ullRoomid = roomNo
  
    if (onlyJoinRoom) {
      return {
        createType: "2",
        mapID,
        mapType,
        ullExternUid,
        roomName: "1",
        platType: "2",
        campid: "1",
      }
    }

    // 将英雄名称转换为ID
    const banHeroIDs: string[] = banHeroNames.map(name => {
      const hero = heroes.find((hero: Hero) => hero.cname === name)
      return hero?.ename.toString() ?? ''
    }).filter(id => id !== '')

    // 生成自定义配置项
  const customDefineItems: string[] = []
  
  function addCustomDefineItem(item: CustomDefineSettingItem) {
    if (item.value === '1') return

    if (Array.isArray(item.index)) {
      item.index.forEach(i => customDefineItems.push(`${i}:${parseInt(item.value) - 1}`))
    } else {
      customDefineItems.push(`${item.index}:${parseInt(item.value) - 1}`)
    }
  }

  addCustomDefineItem(customDefineSettingData.blue.heroes[0].level)
  addCustomDefineItem(customDefineSettingData.blue.heroes[1].level)
  addCustomDefineItem(customDefineSettingData.blue.heroes[2].level)
  addCustomDefineItem(customDefineSettingData.blue.heroes[3].level)
  addCustomDefineItem(customDefineSettingData.blue.heroes[4].level)
  addCustomDefineItem(customDefineSettingData.red.heroes[0].level)
  addCustomDefineItem(customDefineSettingData.red.heroes[1].level)
  addCustomDefineItem(customDefineSettingData.red.heroes[2].level)
  addCustomDefineItem(customDefineSettingData.red.heroes[3].level)
  addCustomDefineItem(customDefineSettingData.red.heroes[4].level)

  addCustomDefineItem(customDefineSettingData.blue.heroes[0].magicAttack)
  addCustomDefineItem(customDefineSettingData.blue.heroes[1].magicAttack)
  addCustomDefineItem(customDefineSettingData.blue.heroes[2].magicAttack)
  addCustomDefineItem(customDefineSettingData.blue.heroes[3].magicAttack)
  addCustomDefineItem(customDefineSettingData.blue.heroes[4].magicAttack)
  addCustomDefineItem(customDefineSettingData.red.heroes[0].magicAttack)
  addCustomDefineItem(customDefineSettingData.red.heroes[1].magicAttack)
  addCustomDefineItem(customDefineSettingData.red.heroes[2].magicAttack)
  addCustomDefineItem(customDefineSettingData.red.heroes[3].magicAttack)
  addCustomDefineItem(customDefineSettingData.red.heroes[4].magicAttack)
  addCustomDefineItem(customDefineSettingData.blue.heroes[0].physicalAttack)
  addCustomDefineItem(customDefineSettingData.blue.heroes[1].physicalAttack)
  addCustomDefineItem(customDefineSettingData.blue.heroes[2].physicalAttack)
  addCustomDefineItem(customDefineSettingData.blue.heroes[3].physicalAttack)
  addCustomDefineItem(customDefineSettingData.blue.heroes[4].physicalAttack)
  addCustomDefineItem(customDefineSettingData.red.heroes[0].physicalAttack)
  addCustomDefineItem(customDefineSettingData.red.heroes[1].physicalAttack)
  addCustomDefineItem(customDefineSettingData.red.heroes[2].physicalAttack)
  addCustomDefineItem(customDefineSettingData.red.heroes[3].physicalAttack)
  addCustomDefineItem(customDefineSettingData.red.heroes[4].physicalAttack)
  addCustomDefineItem(customDefineSettingData.blue.heroes[0].coolDown)
  addCustomDefineItem(customDefineSettingData.blue.heroes[1].coolDown)
  addCustomDefineItem(customDefineSettingData.blue.heroes[2].coolDown)
  addCustomDefineItem(customDefineSettingData.blue.heroes[3].coolDown)
  addCustomDefineItem(customDefineSettingData.blue.heroes[4].coolDown)
  addCustomDefineItem(customDefineSettingData.red.heroes[0].coolDown)
  addCustomDefineItem(customDefineSettingData.red.heroes[1].coolDown)
  addCustomDefineItem(customDefineSettingData.red.heroes[2].coolDown)
  addCustomDefineItem(customDefineSettingData.red.heroes[3].coolDown)
  addCustomDefineItem(customDefineSettingData.red.heroes[4].coolDown)
  addCustomDefineItem(customDefineSettingData.blue.heroes[0].gold)
  addCustomDefineItem(customDefineSettingData.blue.heroes[1].gold)
  addCustomDefineItem(customDefineSettingData.blue.heroes[2].gold)
  addCustomDefineItem(customDefineSettingData.blue.heroes[3].gold)
  addCustomDefineItem(customDefineSettingData.blue.heroes[4].gold)
  addCustomDefineItem(customDefineSettingData.red.heroes[0].gold)
  addCustomDefineItem(customDefineSettingData.red.heroes[1].gold)
  addCustomDefineItem(customDefineSettingData.red.heroes[2].gold)
  addCustomDefineItem(customDefineSettingData.red.heroes[3].gold)
  addCustomDefineItem(customDefineSettingData.red.heroes[4].gold)
  addCustomDefineItem(customDefineSettingData.blue.heroes[0].speed)
  addCustomDefineItem(customDefineSettingData.blue.heroes[1].speed)
  addCustomDefineItem(customDefineSettingData.blue.heroes[2].speed)
  addCustomDefineItem(customDefineSettingData.blue.heroes[3].speed)
  addCustomDefineItem(customDefineSettingData.blue.heroes[4].speed)
  addCustomDefineItem(customDefineSettingData.red.heroes[0].speed)
  addCustomDefineItem(customDefineSettingData.red.heroes[1].speed)
  addCustomDefineItem(customDefineSettingData.red.heroes[2].speed)
  addCustomDefineItem(customDefineSettingData.red.heroes[3].speed)
  addCustomDefineItem(customDefineSettingData.red.heroes[4].speed)
  addCustomDefineItem(customDefineSettingData.blue.line.attack)
  addCustomDefineItem(customDefineSettingData.red.line.attack)
  addCustomDefineItem(customDefineSettingData.blue.line.health)
  addCustomDefineItem(customDefineSettingData.red.line.health)
  addCustomDefineItem(customDefineSettingData.blue.line.speed)
  addCustomDefineItem(customDefineSettingData.red.line.speed)
  addCustomDefineItem(customDefineSettingData.blue.line.refreshSpeed)
  addCustomDefineItem(customDefineSettingData.red.line.refreshSpeed)
  addCustomDefineItem(customDefineSettingData.blue.line.spawnType)
  addCustomDefineItem(customDefineSettingData.red.line.spawnType)
  addCustomDefineItem(customDefineSettingData.blue.tower.attack)
  addCustomDefineItem(customDefineSettingData.red.tower.attack)
  addCustomDefineItem(customDefineSettingData.blue.tower.attackRange)
  addCustomDefineItem(customDefineSettingData.red.tower.attackRange)
  addCustomDefineItem(customDefineSettingData.blue.tower.health)
  addCustomDefineItem(customDefineSettingData.red.tower.health)
  addCustomDefineItem(customDefineSettingData.blue.monster.attack)
  addCustomDefineItem(customDefineSettingData.red.monster.attack)
  addCustomDefineItem(customDefineSettingData.blue.monster.health)
  addCustomDefineItem(customDefineSettingData.red.monster.health)
  addCustomDefineItem(customDefineSettingData.blue.crystal.attack)
  addCustomDefineItem(customDefineSettingData.red.crystal.attack)
  addCustomDefineItem(customDefineSettingData.blue.crystal.health)
  addCustomDefineItem(customDefineSettingData.red.crystal.health)

  const info: GameConfig = {
    createType: "2",
    mapID,
    ullRoomid,
    mapType,
    ullExternUid,
    roomName: "1",
    teamerNum,
    platType: "2",
    campid: team === "blue" ? "1" : "2",
    firstCountDownTime: `${60 * 60}`,
    secondCountDownTime: "17",
    OfflineRelayEntityID: "",
    openAICommentator: "0",
    banHerosCamp1: banHeroIDs,
    banHerosCamp2: banHeroIDs,
    customDefineItems
  }

  if (isFirstJoin) {
    info.AddPos = "0"
    info.AddType = "2"
  } else {
    info.AddType = "0"
  }
  return info
}

export const MapModeType = {
  Standard: "[1,20011,10]",
  OneBan: "[1,20911,10]",
  TwoBan: "[1,20912,10]",
  ThreeBan: "[1,20913,10]",
  FourBan: "[1,20914,10]",
  // 觉醒之战
  Awakening: "[1,5121,10]",
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
    },
    // {
    //   value: MapModeType.Awakening,
    //   label: '觉醒之战'
    // }
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
                          index: ['13']
                      },
                      attackRange: {
                        value: '1',
                        index: ['15']
                      },
                      health: {
                        value: '1',
                        index: ['14',]
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
                        index: ['41']
                      },
                      attackRange: {
                        value: '1',
                        index: ['43']
                      },
                      health: {
                        value: '1',
                        index: ['42']
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