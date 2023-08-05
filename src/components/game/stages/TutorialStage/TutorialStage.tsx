import cn from 'classnames';
import { FC } from 'react';

import { AppConstants } from '@/app/app.constants';

import styles from './TutorialStage.module.scss';
import type { TutorialStageProps } from './TutorialStage.props';

const TutorialStage: FC<TutorialStageProps> = ({}) => {
  const { width, height } = AppConstants.gameSizeConstraints;

  return (
    <div
      style={{
        width: `min(100%, ${width}px)`,
        height,
        border: '2px solid red',
      }}
    >
      Tutorial
    </div>
  );
};

export default TutorialStage;
