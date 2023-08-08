'use client';

import { FC } from 'react';

import { AppConstants } from '@/app/app.constants';
import HowToPlayStage from '@/src/components/game/stages/HowToPlayStage/HowToPlayStage';
import TutorialStage from '@/src/components/game/stages/TutorialStage/TutorialStage';
import { GameStage } from '@/src/enums/GameStage';
import { useGameCycle } from '@/src/hooks/useGameCycle';

import type { NumbersGameProps } from './NumbersGame.props';

const NumbersGame: FC<NumbersGameProps> = ({}) => {
  const { currentStage } = useGameCycle();

  return (
    <>
      {currentStage === GameStage.TUTORIAL && <TutorialStage />}
      {currentStage === GameStage.HOW_TO_PLAY && <HowToPlayStage />}
    </>
  );
};

export default NumbersGame;
