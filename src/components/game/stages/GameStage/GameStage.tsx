import { Stage } from '@pixi/react';
import cn from 'classnames';
import { FC } from 'react';

import { AppConstants } from '@/app/app.constants';

import styles from './GameStage.module.scss';
import type { GameStageProps } from './GameStage.props';

const GameStage: FC<GameStageProps> = props => {
  const { width, height } = AppConstants.gameSizeConstraints;

  return (
    <Stage
      width={width}
      height={height}
      options={{
        background: 'red',
      }}
      style={{}}
      {...props}
    ></Stage>
  );
};

export default GameStage;
