'use client';

import { FC } from 'react';

import CountdownStage from '@/src/components/game/stages/CountdownStage/CountdownStage';
import HowToPlayStage from '@/src/components/game/stages/HowToPlayStage/HowToPlayStage';
import IngameStage from '@/src/components/game/stages/IngameStage/IngameStage';
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
      {currentStage === GameStage.COUNTDOWN && <CountdownStage />}
      {(currentStage === GameStage.INGAME ||
        currentStage === GameStage.RESULTS) && <IngameStage />}
    </>
  );
};

export default NumbersGame;
