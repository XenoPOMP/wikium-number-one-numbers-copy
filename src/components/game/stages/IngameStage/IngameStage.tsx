'use client';

import cn from 'classnames';
import { motion } from 'framer-motion';
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import { CSSProperties, FC, useEffect, useState } from 'react';

import handImage from '@/public/pointer-hand.svg';
import BaseGameStage from '@/src/components/game/stages/GameStage/BaseGameStage';
import Block from '@/src/components/game/stages/IngameStage/Block/Block';
import IngameContext from '@/src/components/game/stages/IngameStage/Ingame.context';
import EndlessTimer from '@/src/components/logic/EndlessTimer/EndlessTimer';
import { GameStage } from '@/src/enums/GameStage';
import { useGameCycle } from '@/src/hooks/useGameCycle';

import styles from './IngameStage.module.scss';
import type { IngameStageProps } from './IngameStage.props';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
});

const IngameStage: FC<IngameStageProps> = ({}) => {
  const [lastedTime, setLastedTime] = useState<number>(60 * 5);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [correctNum, setCorrectNum] = useState<number>(75);
  const [level, setLevel] = useState<number>(4);

  const [background, setBackground] =
    useState<CSSProperties['background']>('#4DB8ECFF');

  const { goToNextStage, currentStage } = useGameCycle();

  useEffect(() => {
    if (lastedTime <= 0) {
      goToNextStage();
    }
  }, [lastedTime]);

  const formatTime = (timeInSeconds: number) => {
    let minutes: string = `00`;
    let seconds: string = `00`;

    const wrapNumber = (num: number) => {
      if (num < 10) {
        return `0${num}`;
      }

      return `${num}`;
    };

    if (timeInSeconds >= 60) {
      minutes = wrapNumber(parseInt(`${timeInSeconds / 60}`));
    }

    seconds = wrapNumber(parseInt(`${timeInSeconds % 60}`));

    return `${minutes}:${seconds}`;
  };

  return (
    <IngameContext.Provider
      value={{
        currentCorrectNum: correctNum,
        checkAnswer: answer => {
          console.log(`Checking value: ${answer} to match ${correctNum}`);

          // setLevel(prev => prev + 1);

          return true;
        },
        level,
      }}
    >
      {currentStage === GameStage.INGAME && (
        <EndlessTimer
          callback={() => {
            setLastedTime(prev => prev - 1);
          }}
          interval={1000}
        />
      )}

      <BaseGameStage usePixi={false}>
        {currentStage === GameStage.INGAME && (
          <div
            className={cn(`w-full h-full`, styles.ingame)}
            style={{
              background: background,
            }}
          >
            <motion.ul
              animate={{
                y: ['-100%', '0%'],
              }}
              transition={{
                duration: 0.3,
                ease: 'easeOut',
              }}
              className={cn(styles.scoreDisplay, montserrat.className)}
            >
              <li>
                <h5>Время</h5>

                <strong>{formatTime(lastedTime)}</strong>
              </li>

              <li>
                <h5>Уровень</h5>

                <strong>{level}</strong>
              </li>

              <li>
                <h5>Очки</h5>

                <strong>{score}</strong>
              </li>

              <li>
                <h5>Серия</h5>

                <strong>
                  <div className={cn(styles.bulletDots)}>
                    <div
                      className={cn(
                        styles.bullet,
                        streak >= 1 && styles.selected
                      )}
                    ></div>
                    <div
                      className={cn(
                        styles.bullet,
                        streak >= 2 && styles.selected
                      )}
                    ></div>
                    <div
                      className={cn(
                        styles.bullet,
                        streak >= 3 && styles.selected
                      )}
                    ></div>
                    <div
                      className={cn(
                        styles.bullet,
                        streak >= 4 && styles.selected
                      )}
                    ></div>
                    <div
                      className={cn(
                        styles.bullet,
                        streak >= 5 && styles.selected
                      )}
                    ></div>
                  </div>

                  <span>x{streak}</span>
                </strong>
              </li>
            </motion.ul>

            <header>
              <p>Найдите указанное число:</p>

              <p className={cn(styles.number, montserrat.className)}>
                {correctNum}
              </p>
            </header>

            <div
              className={cn(styles.grid, montserrat.className)}
              style={{
                gridTemplateColumns: level >= 4 ? `repeat(4, 1fr)` : '',
              }}
            >
              <Block number={913} animation={'nothing-rotate'} />
              <Block
                background={'#fc73b0'}
                number={614}
                animation={'blink-nothing'}
              />
              <Block background={'#8e3dcb'} number={558} />
              <Block background={'#94c94d'} number={89} />
              <Block background={'#94c94d'} number={40} />
              <Block background={'transparent'} number={2} />
            </div>
          </div>
        )}

        {currentStage === GameStage.RESULTS && (
          <div className={cn('w-full h-full bg-[red]')}>Results</div>
        )}
      </BaseGameStage>
    </IngameContext.Provider>
  );
};

export default IngameStage;
