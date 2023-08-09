import { Defined, RecordValue } from '@xenopomp/advanced-types';
import cn from 'classnames';
import { Target, TargetAndTransition, Transition, motion } from 'framer-motion';
import { FC, useContext } from 'react';

import IngameContext from '@/src/components/game/stages/IngameStage/Ingame.context';
import { useGameCycle } from '@/src/hooks/useGameCycle';

import styles from './Block.module.scss';
import type { BlockProps } from './Block.props';

const Block: FC<BlockProps> = ({
  number,
  background = '#f28e37',
  animation = 'no-animation',
}) => {
  const { checkAnswer, level } = useContext(IngameContext);
  const {} = useGameCycle();

  const animationVariants: Record<
    Defined<BlockProps['animation']>,
    Partial<
      Record<
        'block' | 'text',
        {
          animation: TargetAndTransition;
          transition?: Transition;
        }
      >
    >
  > = {
    'no-animation': {},
    'nothing-rotate': {
      text: {
        animation: {
          rotate: ['0deg', '-15deg', '0deg', '15deg', '0deg'],
        },
        transition: {
          repeat: Infinity,
          duration: 0.55,
        },
      },
    },
    'blink-nothing': {
      block: {
        animation: {
          opacity: [1, 0, 1],
        },

        transition: {
          repeat: Infinity,
          duration: 0.75,
        },
      },
    },
  };

  const getAnimationVariants = (): RecordValue<typeof animationVariants> => {
    if (level < 3) {
      // return animationVariants['no-animation'];
    }

    return animationVariants[animation];
  };

  return (
    <motion.div
      animate={getAnimationVariants().block?.animation}
      transition={getAnimationVariants().block?.transition}
      className={cn(styles.block, `bg-[${background}]`)}
      onClick={() => {
        checkAnswer(number);
      }}
    >
      <motion.span
        animate={getAnimationVariants().text?.animation}
        transition={getAnimationVariants().text?.transition}
      >
        {number}
      </motion.span>
    </motion.div>
  );
};

export default Block;
