import cn from 'classnames';
import { TargetAndTransition, motion } from 'framer-motion';
import { FC } from 'react';

import styles from './Loader.module.scss';
import type { LoaderProps } from './Loader.props';

const Loader: FC<LoaderProps> = ({ primaryColor = 'white' }) => {
  const Dot: FC<{}> = ({}) => {
    const ANIMATION_DURATION = 1;

    return (
      <motion.div
        animate={{
          opacity: [0.25, 1, 0.25],
        }}
        transition={{
          repeat: Infinity,
          duration: ANIMATION_DURATION,
        }}
        className={cn(styles.dot)}
      ></motion.div>
    );
  };

  return (
    <div
      className={cn(styles.loader)}
      style={{
        color: primaryColor,
      }}
    >
      <Dot />
      <Dot />
      <Dot />

      <Dot />
      <Dot />
      <Dot />

      <Dot />
      <Dot />
      <Dot />
    </div>
  );
};

export default Loader;
