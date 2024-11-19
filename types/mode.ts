// 基础类型
export type CustomDefineSettingItem = {
    name?: string;
    value: string;
    index: string | string[];
}

// 英雄
export type HeroCustomDefineSettingItem = {
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

// 兵线
export type LineCustomDefineSettingItem = {
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
export type TowerCustomDefineSettingItem = {
    // 攻击力
    attack: CustomDefineSettingItem;
    // 攻击范围
    attackRange: CustomDefineSettingItem;
    //血量
    health: CustomDefineSettingItem;
}

// 水晶
export type CrystalCustomDefineSettingItem = {
    // 攻击力
    attack: CustomDefineSettingItem;
    // 血量
    health: CustomDefineSettingItem;
}

// 野怪
export type MonsterCustomDefineSettingItem = {
    // 攻击力
    attack: CustomDefineSettingItem;
    // 血量
    health: CustomDefineSettingItem;
}

export type CustomDefineSettingDataType = {
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

export type ModeSetting = {
    mapMode: string
    banHeroNames: string[]
    customDefineSettingData: CustomDefineSettingDataType
    heroConfigType: string
    lineConfigType: string
    towerConfigType: string
}

export type Mode = {
    id?: string
    name: string
    description?: string
    settings: ModeSetting
    usageCount?: number
    createdAt?: Date
}

// 游戏配置
export type GameConfig = {
    mapType?: number
    mapID?: number
    teamerNum?: number
    customDefineItems?: string[]
    banHerosCamp1?: string[]
    banHerosCamp2?: string[]
    AddPos?: string
    AddType?: string
    OfflineRelayEntityID?: string
    campid?: string
    createType?: string
    firstCountDownTime?: string
    openAICommentator?: string
    platType?: string
    roomName?: string
    secondCountDownTime?: string
    ullExternUid?: number | string
    ullRoomid?: number | string
}