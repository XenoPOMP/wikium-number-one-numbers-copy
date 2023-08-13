import { PropsWith } from '@xenopomp/advanced-types';
import cn from 'classnames';
import { FC } from 'react';

import styles from './Button.module.scss';
import type { ButtonProps } from './Button.props';

const Button: FC<PropsWith<'children' | 'className', ButtonProps>> = ({
  children,
  className,
  onClick,
  variant = 'normal',
}) => {
  return (
    <button
      className={cn(styles.uiButton, className)}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      {children}
    </button>
  );
};

export default Button;
