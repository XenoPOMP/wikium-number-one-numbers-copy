import { PropsWith } from '@xenopomp/advanced-types';
import cn from 'classnames';
import { CSSProperties, FC } from 'react';

import { AppConstants } from '@/app/app.constants';
import numbersImage from '@/public/numbers-image-1.svg';

import styles from './BaseStage.module.scss';
import type { BaseStageProps } from './BaseStage.props';

const BaseStage: FC<
  PropsWith<'children' | 'className' | 'style', BaseStageProps>
> = ({ children, className, style }) => {
  const { width, height } = AppConstants.gameSizeConstraints;

  const getInlineStyles = (): CSSProperties => {
    return {
      width: `min(100%, ${width}px)`,
      height,
      boxShadow: '0 0 4px rgba(0 0 0 / .35)',
      borderRadius: '.2em',
      overflow: 'hidden',
      ...style,
    };
  };

  return (
    <article className={cn(styles.stage, className)} style={getInlineStyles()}>
      {children}
    </article>
  );
};

export default BaseStage;
