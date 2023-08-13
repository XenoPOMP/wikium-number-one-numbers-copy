import { Defined, RecordValue } from '@xenopomp/advanced-types';
import cn from 'classnames';
import { Target, TargetAndTransition, Transition, motion } from 'framer-motion';
import { FC, useContext } from 'react';

import IngameContext from '@/src/components/game/stages/IngameStage/Ingame.context';
import { useGameCycle } from '@/src/hooks/useGameCycle';

import styles from './Block.module.scss';
import type { IBlock } from './Block.props';

const Block: FC<IBlock> = ({
  number,
  background = '#f28e37',
  animation = 'no-animation',
}) => {
  const { checkAnswer, level } = useContext(IngameContext);
  const {} = useGameCycle();

  const animationVariants: Record<
    Defined<IBlock['animation']>,
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
          duration: 0.4 * 1.5,
          ease: 'easeIn',
        },
      },
    },

    'scaleDown-nothing': {
      block: {
        animation: {
          scale: [1, 0.75, 1],
        },

        transition: {
          repeat: Infinity,
          duration: 0.4 * 1.5,
          ease: 'easeIn',
        },
      },
    },
  };

  const getAnimationVariants = (): RecordValue<typeof animationVariants> => {
    if (level < 3) {
      return animationVariants['no-animation'];
    }

    return animationVariants[animation];
  };

  const getInlineClasses = (): string => {
    let levelClass = '';

    if (level >= 4 && level < 6) {
      levelClass = cn(levelClass, styles.fourCols);
    }

    if (level >= 6) {
      levelClass = cn(levelClass, styles.fourCols, styles.threeRows);
    }

    return cn(levelClass);
  };

  return (
    <motion.div
      animate={getAnimationVariants().block?.animation}
      transition={getAnimationVariants().block?.transition}
      className={cn(styles.block, `bg-[${background}]`, getInlineClasses())}
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
