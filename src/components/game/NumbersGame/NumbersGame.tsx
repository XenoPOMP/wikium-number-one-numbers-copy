'use client';

import { Stage } from '@pixi/react';
import { FC } from 'react';

import { AppConstants } from '@/app/app.constants';
import TutorialStage from '@/src/components/game/stages/TutorialStage/TutorialStage';
import { GameStage } from '@/src/enums/GameStage';
import { useGameCycle } from '@/src/hooks/useGameCycle';

import type { NumbersGameProps } from './NumbersGame.props';

const NumbersGame: FC<NumbersGameProps> = ({}) => {
  const { currentStage } = useGameCycle();
  const { width, height } = AppConstants.gameSizeConstraints;

  // <Stage
  //   width={width}
  //   height={height}
  //   options={{
  //     background: 'red',
  //   }}
  // ></Stage>

  return <>{currentStage === GameStage.TUTORIAL && <TutorialStage />}</>;
};

export default NumbersGame;
