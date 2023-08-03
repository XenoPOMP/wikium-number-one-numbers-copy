'use client';

import cn from 'classnames';
import { FC } from 'react';

import { useGameCycle } from '@/src/hooks/useGameCycle';

import styles from './NumbersGame.module.scss';
import type { NumbersGameProps } from './NumbersGame.props';

const NumbersGame: FC<NumbersGameProps> = ({}) => {
  const { currentStage } = useGameCycle();

  return <div>{currentStage}</div>;
};

export default NumbersGame;
