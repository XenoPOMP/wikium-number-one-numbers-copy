import { Stage } from '@pixi/react';
import cn from 'classnames';
import { FC } from 'react';

import { AppConstants } from '@/app/app.constants';
import BaseStage from '@/src/components/game/stages/BaseStage/BaseStage';

import styles from './GameStage.module.scss';
import type { GameStageProps } from './GameStage.props';

const GameStage: FC<GameStageProps> = props => {
  const { children, className } = props;
  const { width, height, inlinePadding } = AppConstants.gameSizeConstraints;

  return (
    <BaseStage className={'flex justify-center items-center'}>
      <Stage
        {...props}
        width={width - inlinePadding * 2}
        height={height - inlinePadding * 2}
        className={className}
      >
        {children}
      </Stage>
    </BaseStage>
  );
};

export default GameStage;
