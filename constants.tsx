
import React from 'react';
import { DiceConfig } from './types';

export const DICE_CONFIGS: DiceConfig[] = [
  { type: 'd4', sides: 4, label: 'D4', color: 'from-rose-500 to-pink-600', icon: '▲' },
  { type: 'd6', sides: 6, label: 'D6', color: 'from-orange-500 to-amber-600', icon: '■' },
  { type: 'd8', sides: 8, label: 'D8', color: 'from-emerald-500 to-teal-600', icon: '◆' },
  { type: 'd10', sides: 10, label: 'D10', color: 'from-cyan-500 to-blue-600', icon: '⬟' },
  { type: 'd12', sides: 12, label: 'D12', color: 'from-indigo-500 to-violet-600', icon: '⬢' },
  { type: 'd20', sides: 20, label: 'D20', color: 'from-purple-500 to-fuchsia-600', icon: '◈' },
  { type: 'coin', sides: 2, label: 'Coin', color: 'from-yellow-400 to-amber-500', icon: '●' },
];
