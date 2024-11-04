import { NextResponse } from "next/server"
import { type Mode } from "@/types/mode"
import { generateDefaultMode } from "@/lib/mode";
import { ModeService } from "@/lib/services/mode.service";
import { ObjectId } from "mongodb";
import { MapModeType } from "@/lib/mode";

// 模拟数据库中的数据
const PRESET_MODES: Mode[] = [
  {
    "id": "67279648bf84d945e7877358",
    "name": "无CD模式",
    "description": "技能无冷却、无消耗",
    "settings": {
        "mapMode": MapModeType.FourBan,
        "banHeroNames": [],
        "customDefineSettingData": {
            "blue": {
                "heroes": [
                    {
                        "level": {
                            "value": "7",
                            "index": "0"
                        },
                        "magicAttack": {
                            "value": "5",
                            "index": "1"
                        },
                        "physicalAttack": {
                            "value": "5",
                            "index": "2"
                        },
                        "coolDown": {
                            "value": "5",
                            "index": "3"
                        },
                        "gold": {
                            "value": "1",
                            "index": "4"
                        },
                        "speed": {
                            "value": "4",
                            "index": "106"
                        }
                    },
                    {
                        "level": {
                            "value": "7",
                            "index": "51"
                        },
                        "magicAttack": {
                            "value": "5",
                            "index": "52"
                        },
                        "physicalAttack": {
                            "value": "5",
                            "index": "53"
                        },
                        "coolDown": {
                            "value": "5",
                            "index": "54"
                        },
                        "gold": {
                            "value": "1",
                            "index": "55"
                        },
                        "speed": {
                            "value": "4",
                            "index": "107"
                        }
                    },
                    {
                        "level": {
                            "value": "7",
                            "index": "56"
                        },
                        "magicAttack": {
                            "value": "5",
                            "index": "57"
                        },
                        "physicalAttack": {
                            "value": "5",
                            "index": "58"
                        },
                        "coolDown": {
                            "value": "5",
                            "index": "59"
                        },
                        "gold": {
                            "value": "1",
                            "index": "60"
                        },
                        "speed": {
                            "value": "4",
                            "index": "108"
                        }
                    },
                    {
                        "level": {
                            "value": "7",
                            "index": "61"
                        },
                        "magicAttack": {
                            "value": "5",
                            "index": "62"
                        },
                        "physicalAttack": {
                            "value": "5",
                            "index": "63"
                        },
                        "coolDown": {
                            "value": "5",
                            "index": "64"
                        },
                        "gold": {
                            "value": "1",
                            "index": "65"
                        },
                        "speed": {
                            "value": "4",
                            "index": "109"
                        }
                    },
                    {
                        "level": {
                            "value": "7",
                            "index": "66"
                        },
                        "magicAttack": {
                            "value": "5",
                            "index": "67"
                        },
                        "physicalAttack": {
                            "value": "5",
                            "index": "68"
                        },
                        "coolDown": {
                            "value": "5",
                            "index": "69"
                        },
                        "gold": {
                            "value": "1",
                            "index": "70"
                        },
                        "speed": {
                            "value": "4",
                            "index": "110"
                        }
                    }
                ],
                "line": {
                    "attack": {
                        "value": "6",
                        "index": "5"
                    },
                    "health": {
                        "value": "6",
                        "index": "6"
                    },
                    "speed": {
                        "value": "4",
                        "index": "7"
                    },
                    "refreshSpeed": {
                        "value": "4",
                        "index": "8"
                    },
                    "spawnType": {
                        "value": "1",
                        "index": "9"
                    }
                },
                "tower": {
                    "attack": {
                        "value": "4",
                        "index": [
                            "13",
                            "22"
                        ]
                    },
                    "attackRange": {
                        "value": "3",
                        "index": [
                            "15",
                            "24"
                        ]
                    },
                    "health": {
                        "value": "4",
                        "index": [
                            "14",
                            "23"
                        ]
                    }
                },
                "monster": {
                    "attack": {
                        "value": "4",
                        "index": "11"
                    },
                    "health": {
                        "value": "6",
                        "index": "12"
                    }
                },
                "crystal": {
                    "attack": {
                        "value": "4",
                        "index": "16"
                    },
                    "health": {
                        "value": "4",
                        "index": "17"
                    }
                }
            },
            "red": {
                "heroes": [
                    {
                        "level": {
                            "value": "7",
                            "index": "28"
                        },
                        "magicAttack": {
                            "value": "5",
                            "index": "29"
                        },
                        "physicalAttack": {
                            "value": "5",
                            "index": "30"
                        },
                        "coolDown": {
                            "value": "5",
                            "index": "31"
                        },
                        "gold": {
                            "value": "1",
                            "index": "32"
                        },
                        "speed": {
                            "value": "4",
                            "index": "111"
                        }
                    },
                    {
                        "level": {
                            "value": "7",
                            "index": "71"
                        },
                        "magicAttack": {
                            "value": "5",
                            "index": "72"
                        },
                        "physicalAttack": {
                            "value": "5",
                            "index": "73"
                        },
                        "coolDown": {
                            "value": "5",
                            "index": "74"
                        },
                        "gold": {
                            "value": "1",
                            "index": "75"
                        },
                        "speed": {
                            "value": "4",
                            "index": "112"
                        }
                    },
                    {
                        "level": {
                            "value": "7",
                            "index": "76"
                        },
                        "magicAttack": {
                            "value": "5",
                            "index": "77"
                        },
                        "physicalAttack": {
                            "value": "5",
                            "index": "78"
                        },
                        "coolDown": {
                            "value": "5",
                            "index": "79"
                        },
                        "gold": {
                            "value": "1",
                            "index": "80"
                        },
                        "speed": {
                            "value": "4",
                            "index": "113"
                        }
                    },
                    {
                        "level": {
                            "value": "7",
                            "index": "81"
                        },
                        "magicAttack": {
                            "value": "5",
                            "index": "82"
                        },
                        "physicalAttack": {
                            "value": "5",
                            "index": "83"
                        },
                        "coolDown": {
                            "value": "5",
                            "index": "84"
                        },
                        "gold": {
                            "value": "1",
                            "index": "85"
                        },
                        "speed": {
                            "value": "4",
                            "index": "114"
                        }
                    },
                    {
                        "level": {
                            "value": "7",
                            "index": "86"
                        },
                        "magicAttack": {
                            "value": "5",
                            "index": "87"
                        },
                        "physicalAttack": {
                            "value": "5",
                            "index": "88"
                        },
                        "coolDown": {
                            "value": "5",
                            "index": "89"
                        },
                        "gold": {
                            "value": "1",
                            "index": "90"
                        },
                        "speed": {
                            "value": "4",
                            "index": "115"
                        }
                    }
                ],
                "line": {
                    "attack": {
                        "value": "6",
                        "index": "33"
                    },
                    "health": {
                        "value": "6",
                        "index": "34"
                    },
                    "speed": {
                        "value": "4",
                        "index": "35"
                    },
                    "refreshSpeed": {
                        "value": "4",
                        "index": "36"
                    },
                    "spawnType": {
                        "value": "1",
                        "index": "37"
                    }
                },
                "tower": {
                    "attack": {
                        "value": "1",
                        "index": [
                            "41",
                            "48"
                        ]
                    },
                    "attackRange": {
                        "value": "1",
                        "index": [
                            "43",
                            "50"
                        ]
                    },
                    "health": {
                        "value": "1",
                        "index": [
                            "42",
                            "49"
                        ]
                    }
                },
                "monster": {
                    "attack": {
                        "value": "4",
                        "index": "39"
                    },
                    "health": {
                        "value": "6",
                        "index": "40"
                    }
                },
                "crystal": {
                    "attack": {
                        "value": "1",
                        "index": "44"
                    },
                    "health": {
                        "value": "1",
                        "index": "45"
                    }
                }
            }
        },
        "heroConfigType": "global",
        "lineConfigType": "line-global",
        "towerConfigType": "tower-global"
    }
  },
  {
    "id": "67279648bf84d945e7877358",
    "name": "无CD模式(禁无敌)",
    "description": "技能无冷却、无消耗, 禁用无敌英雄",
    "settings": {
        "mapMode": MapModeType.FourBan,
        "banHeroNames": [
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
        ],
        "customDefineSettingData": {
            "blue": {
                "heroes": [
                    {
                        "level": {
                            "value": "7",
                            "index": "0"
                        },
                        "magicAttack": {
                            "value": "5",
                            "index": "1"
                        },
                        "physicalAttack": {
                            "value": "5",
                            "index": "2"
                        },
                        "coolDown": {
                            "value": "5",
                            "index": "3"
                        },
                        "gold": {
                            "value": "1",
                            "index": "4"
                        },
                        "speed": {
                            "value": "4",
                            "index": "106"
                        }
                    },
                    {
                        "level": {
                            "value": "7",
                            "index": "51"
                        },
                        "magicAttack": {
                            "value": "5",
                            "index": "52"
                        },
                        "physicalAttack": {
                            "value": "5",
                            "index": "53"
                        },
                        "coolDown": {
                            "value": "5",
                            "index": "54"
                        },
                        "gold": {
                            "value": "1",
                            "index": "55"
                        },
                        "speed": {
                            "value": "4",
                            "index": "107"
                        }
                    },
                    {
                        "level": {
                            "value": "7",
                            "index": "56"
                        },
                        "magicAttack": {
                            "value": "5",
                            "index": "57"
                        },
                        "physicalAttack": {
                            "value": "5",
                            "index": "58"
                        },
                        "coolDown": {
                            "value": "5",
                            "index": "59"
                        },
                        "gold": {
                            "value": "1",
                            "index": "60"
                        },
                        "speed": {
                            "value": "4",
                            "index": "108"
                        }
                    },
                    {
                        "level": {
                            "value": "7",
                            "index": "61"
                        },
                        "magicAttack": {
                            "value": "5",
                            "index": "62"
                        },
                        "physicalAttack": {
                            "value": "5",
                            "index": "63"
                        },
                        "coolDown": {
                            "value": "5",
                            "index": "64"
                        },
                        "gold": {
                            "value": "1",
                            "index": "65"
                        },
                        "speed": {
                            "value": "4",
                            "index": "109"
                        }
                    },
                    {
                        "level": {
                            "value": "7",
                            "index": "66"
                        },
                        "magicAttack": {
                            "value": "5",
                            "index": "67"
                        },
                        "physicalAttack": {
                            "value": "5",
                            "index": "68"
                        },
                        "coolDown": {
                            "value": "5",
                            "index": "69"
                        },
                        "gold": {
                            "value": "1",
                            "index": "70"
                        },
                        "speed": {
                            "value": "4",
                            "index": "110"
                        }
                    }
                ],
                "line": {
                    "attack": {
                        "value": "6",
                        "index": "5"
                    },
                    "health": {
                        "value": "6",
                        "index": "6"
                    },
                    "speed": {
                        "value": "4",
                        "index": "7"
                    },
                    "refreshSpeed": {
                        "value": "4",
                        "index": "8"
                    },
                    "spawnType": {
                        "value": "1",
                        "index": "9"
                    }
                },
                "tower": {
                    "attack": {
                        "value": "4",
                        "index": [
                            "13",
                            "22"
                        ]
                    },
                    "attackRange": {
                        "value": "3",
                        "index": [
                            "15",
                            "24"
                        ]
                    },
                    "health": {
                        "value": "4",
                        "index": [
                            "14",
                            "23"
                        ]
                    }
                },
                "monster": {
                    "attack": {
                        "value": "4",
                        "index": "11"
                    },
                    "health": {
                        "value": "6",
                        "index": "12"
                    }
                },
                "crystal": {
                    "attack": {
                        "value": "4",
                        "index": "16"
                    },
                    "health": {
                        "value": "4",
                        "index": "17"
                    }
                }
            },
            "red": {
                "heroes": [
                    {
                        "level": {
                            "value": "7",
                            "index": "28"
                        },
                        "magicAttack": {
                            "value": "5",
                            "index": "29"
                        },
                        "physicalAttack": {
                            "value": "5",
                            "index": "30"
                        },
                        "coolDown": {
                            "value": "5",
                            "index": "31"
                        },
                        "gold": {
                            "value": "1",
                            "index": "32"
                        },
                        "speed": {
                            "value": "4",
                            "index": "111"
                        }
                    },
                    {
                        "level": {
                            "value": "7",
                            "index": "71"
                        },
                        "magicAttack": {
                            "value": "5",
                            "index": "72"
                        },
                        "physicalAttack": {
                            "value": "5",
                            "index": "73"
                        },
                        "coolDown": {
                            "value": "5",
                            "index": "74"
                        },
                        "gold": {
                            "value": "1",
                            "index": "75"
                        },
                        "speed": {
                            "value": "4",
                            "index": "112"
                        }
                    },
                    {
                        "level": {
                            "value": "7",
                            "index": "76"
                        },
                        "magicAttack": {
                            "value": "5",
                            "index": "77"
                        },
                        "physicalAttack": {
                            "value": "5",
                            "index": "78"
                        },
                        "coolDown": {
                            "value": "5",
                            "index": "79"
                        },
                        "gold": {
                            "value": "1",
                            "index": "80"
                        },
                        "speed": {
                            "value": "4",
                            "index": "113"
                        }
                    },
                    {
                        "level": {
                            "value": "7",
                            "index": "81"
                        },
                        "magicAttack": {
                            "value": "5",
                            "index": "82"
                        },
                        "physicalAttack": {
                            "value": "5",
                            "index": "83"
                        },
                        "coolDown": {
                            "value": "5",
                            "index": "84"
                        },
                        "gold": {
                            "value": "1",
                            "index": "85"
                        },
                        "speed": {
                            "value": "4",
                            "index": "114"
                        }
                    },
                    {
                        "level": {
                            "value": "7",
                            "index": "86"
                        },
                        "magicAttack": {
                            "value": "5",
                            "index": "87"
                        },
                        "physicalAttack": {
                            "value": "5",
                            "index": "88"
                        },
                        "coolDown": {
                            "value": "5",
                            "index": "89"
                        },
                        "gold": {
                            "value": "1",
                            "index": "90"
                        },
                        "speed": {
                            "value": "4",
                            "index": "115"
                        }
                    }
                ],
                "line": {
                    "attack": {
                        "value": "6",
                        "index": "33"
                    },
                    "health": {
                        "value": "6",
                        "index": "34"
                    },
                    "speed": {
                        "value": "4",
                        "index": "35"
                    },
                    "refreshSpeed": {
                        "value": "4",
                        "index": "36"
                    },
                    "spawnType": {
                        "value": "1",
                        "index": "37"
                    }
                },
                "tower": {
                    "attack": {
                        "value": "1",
                        "index": [
                            "41",
                            "48"
                        ]
                    },
                    "attackRange": {
                        "value": "1",
                        "index": [
                            "43",
                            "50"
                        ]
                    },
                    "health": {
                        "value": "1",
                        "index": [
                            "42",
                            "49"
                        ]
                    }
                },
                "monster": {
                    "attack": {
                        "value": "4",
                        "index": "39"
                    },
                    "health": {
                        "value": "6",
                        "index": "40"
                    }
                },
                "crystal": {
                    "attack": {
                        "value": "1",
                        "index": "44"
                    },
                    "health": {
                        "value": "1",
                        "index": "45"
                    }
                }
            }
        },
        "heroConfigType": "global",
        "lineConfigType": "line-global",
        "towerConfigType": "tower-global"
    }
  },
]

export async function GET() {
  const hotModes = await ModeService.getHotModes()
  return NextResponse.json({
    presetModes: PRESET_MODES,
    hotModes: hotModes
  })
} 