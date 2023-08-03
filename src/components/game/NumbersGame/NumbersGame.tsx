'use client';

import { Stage } from '@pixi/react';
import cn from 'classnames';
import { FC } from 'react';

import { useGameCycle } from '@/src/hooks/useGameCycle';

import styles from './NumbersGame.module.scss';
import type { NumbersGameProps } from './NumbersGame.props';

const NumbersGame: FC<NumbersGameProps> = ({}) => {
  const { currentStage } = useGameCycle();

  return (
    <Stage
      width={700}
      height={550}
      options={{
        background: 'red',
      }}
    ></Stage>
  );
};

export default NumbersGame;
