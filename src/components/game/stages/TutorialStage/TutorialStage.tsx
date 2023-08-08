'use client';

import cn from 'classnames';
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import { CSSProperties, FC } from 'react';

import { AppConstants } from '@/app/app.constants';
import eyeIcon from '@/public/eye-icon.svg';
import numbersImage from '@/public/numbers-image-1.svg';
import StageStep from '@/src/components/game/stages/TutorialStage/StageStep/StageStep';
import { useGameCycle } from '@/src/hooks/useGameCycle';
import { useAppDispatch } from '@/src/redux/hooks';
import { nextStage } from '@/src/redux/reducers/gameCycle.slice';

import styles from './TutorialStage.module.scss';
import type { TutorialStageProps } from './TutorialStage.props';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
});

const TutorialStage: FC<TutorialStageProps> = ({}) => {
  const { width, height } = AppConstants.gameSizeConstraints;
  const { goToNextStage } = useGameCycle();

  const getInlineStyles = (): Record<'article' | 'heading', CSSProperties> => {
    const output: ReturnType<typeof getInlineStyles> = {
      article: {},
      heading: {},
    };

    output.article = {
      width: `min(100%, ${width}px)`,
      height,
      boxShadow: '0 0 4px rgba(0 0 0 / .35)',
      borderRadius: '.2em',
      overflow: 'hidden',
    };

    output.heading = {
      background: `url(${numbersImage.src}) center`,
      backgroundSize: 'cover',
    };

    return output;
  };

  const dispatch = useAppDispatch();

  return (
    <article
      className={cn(styles.tutorial, montserrat.className)}
      style={getInlineStyles().article}
    >
      <article className={cn(styles.heading)} style={getInlineStyles().heading}>
        <h1>Найди число</h1>

        <p>Тренажер на внимание</p>
      </article>

      <article className={cn(styles.steps)}>
        <h2>Тренирует:</h2>

        <ul className={cn(styles.stepGroup)}>
          <StageStep
            heading={'Произвольное внимание'}
            paragraphs={['Научитесь концентрировать внимание только на важном']}
          />

          <StageStep
            icon={'eye-expand'}
            heading={'Концентрацию и переключение внимания'}
            paragraphs={['Позволит не упускать из виду важные детали']}
          />

          <StageStep
            icon={'eye-three'}
            heading={'Зрительное восприятие'}
            paragraphs={['Сможете быстро находить основные мысли в текстах']}
          />
        </ul>

        <button
          className={cn(styles.nextStepButton)}
          onClick={() => {
            goToNextStage();
          }}
        >
          Далее
        </button>
      </article>
    </article>
  );
};

export default TutorialStage;
