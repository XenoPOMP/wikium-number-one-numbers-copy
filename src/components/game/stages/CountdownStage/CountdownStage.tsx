'use client';

import cn from 'classnames';
import { Montserrat } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

import BaseStage from '@/src/components/game/stages/BaseStage/BaseStage';
import BaseGameStage from '@/src/components/game/stages/GameStage/BaseGameStage';
import EndlessTimer from '@/src/components/logic/EndlessTimer/EndlessTimer';
import { useGameCycle } from '@/src/hooks/useGameCycle';

import styles from './CountdownStage.module.scss';
import type { CountdownStageProps } from './CountdownStage.props';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
});

const CountdownStage: FC<CountdownStageProps> = ({}) => {
  const [countdown, setCountdown] = useState<number>(3);
  const { goToNextStage } = useGameCycle();

  useEffect(() => {
    if (countdown <= 0) {
      goToNextStage();
    }
  }, [countdown]);

  return (
    <BaseGameStage usePixi={false}>
      <EndlessTimer
        callback={() => {
          setCountdown(prev => prev - 1);
        }}
        interval={1000}
      />

      <article className={cn('w-full h-full', styles.countdownBody)}>
        <div className={cn(styles.timeLast, montserrat.className)}>
          {countdown}
        </div>
      </article>
    </BaseGameStage>
  );
};

export default CountdownStage;
