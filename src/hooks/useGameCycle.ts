'use client';

import { GameStage } from '@/src/enums/GameStage';
import { useAppDispatch, useTypedSelector } from '@/src/redux/hooks';
import {
  GameCycleState,
  nextStage,
} from '@/src/redux/reducers/gameCycle.slice';

/**
 * Данный хук предоставляет всю логику, связанную с игрой.
 */
export const useGameCycle = (): {
  currentStage: GameStage;
  goToNextStage: () => void;
} => {
  const { stage }: GameCycleState = useTypedSelector(state => state.gameCycle);

  const dispatch = useAppDispatch();

  const goToNextStage = () => {
    dispatch(nextStage());
  };

  return {
    currentStage: stage,
    goToNextStage,
  };
};
