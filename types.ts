
export type DiceType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'coin';

export interface RollResult {
  id: string;
  type: DiceType;
  value: number | string;
  timestamp: number;
}

export interface RollBatch {
  id: string;
  rolls: RollResult[];
  total: number;
  timestamp: number;
  aiInterpretation?: string;
}

export interface DiceConfig {
  type: DiceType;
  sides: number;
  label: string;
  color: string;
  icon: string;
}
