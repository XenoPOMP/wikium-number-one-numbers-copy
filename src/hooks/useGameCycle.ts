'use client';

import { GameStage } from '@/src/enums/GameStage';
import { useTypedSelector } from '@/src/redux/hooks';
import { GameCycleState } from '@/src/redux/reducers/gameCycle.slice';

/**
 * Данный хук предоставляет всю логику, связанную с игрой.
 */
export const useGameCycle = (): {
  currentStage: GameStage;
} => {
  const { stage }: GameCycleState = useTypedSelector(state => state.gameCycle);

  return {
    currentStage: stage,
  };
};