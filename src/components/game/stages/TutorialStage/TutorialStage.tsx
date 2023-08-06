import cn from 'classnames';
import { CSSProperties, FC } from 'react';

import { AppConstants } from '@/app/app.constants';
import numbersImage from '@/public/numbers-image-1.svg';

import styles from './TutorialStage.module.scss';
import type { TutorialStageProps } from './TutorialStage.props';

const TutorialStage: FC<TutorialStageProps> = ({}) => {
  const { width, height } = AppConstants.gameSizeConstraints;

  const getInlineStyles = (): Record<'article' | 'heading', CSSProperties> => {
    const output: ReturnType<typeof getInlineStyles> = {
      article: {},
      heading: {},
    };

    output.article = {
      width: `min(100%, ${width}px)`,
      height,
      border: '2px solid red',
    };

    output.heading = {
      // background: `${numbersImage.src}`,
      // backgroundSize: 'cover',
    };

    return output;
  };

  return (
    <article className={cn(styles.tutorial)} style={getInlineStyles().article}>
      <div className={cn(styles.heading)} style={getInlineStyles().heading}>
        <h1>Header</h1>
      </div>
    </article>
  );
};

export default TutorialStage;
