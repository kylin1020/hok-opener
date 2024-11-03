export interface BanHeroListFormProps {
  heroes: Hero[];
  banHeroNames: string[];
  setBanHeroNames: (names: string[]) => void;
}

export type HeroConfigFormComponentProps = {
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

export type LineConfigFormComponentProps = {
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

export type MonsterConfigFormComponentProps = {
  attackInitialValue: string
  healthInitialValue: string
  onAttackChange: (value: string) => void
  onHealthChange: (value: string) => void
}

export type TowerConfigFormComponentProps = {
  attackInitialValue: string
  attackRangeInitialValue: string
  healthInitialValue: string    
  onAttackChange: (value: string) => void
  onAttackRangeChange: (value: string) => void
  onHealthChange: (value: string) => void
}

export type CrystalConfigFormComponentProps = {
  attackInitialValue: string
  healthInitialValue: string
  onAttackChange: (value: string) => void
  onHealthChange: (value: string) => void
} 