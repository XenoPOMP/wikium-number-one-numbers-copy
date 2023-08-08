import { Stage } from '@pixi/react';
import cn from 'classnames';
import { FC } from 'react';

import { AppConstants } from '@/app/app.constants';
import GameStage from '@/src/components/game/stages/GameStage/GameStage';

import styles from './HowToPlayStage.module.scss';
import type { HowToPlayStageProps } from './HowToPlayStage.props';

const HowToPlayStage: FC<HowToPlayStageProps> = props => {
  return <GameStage {...props} />;
};

export default HowToPlayStage;
