'use client';

import { Defined } from '@xenopomp/advanced-types';
import cn from 'classnames';
import { motion } from 'framer-motion';
import { Montserrat } from 'next/font/google';
import random from 'random';
import randomItem from 'random-item';
import { CSSProperties, FC, useEffect, useState } from 'react';

import BaseGameStage from '@/src/components/game/stages/GameStage/BaseGameStage';
import Block from '@/src/components/game/stages/IngameStage/Block/Block';
import { IBlock } from '@/src/components/game/stages/IngameStage/Block/Block.props';
import IngameContext from '@/src/components/game/stages/IngameStage/Ingame.context';
import EndlessTimer from '@/src/components/logic/EndlessTimer/EndlessTimer';
import Loader from '@/src/components/ui/Loader/Loader';
import { GameStage } from '@/src/enums/GameStage';
import useBoolean from '@/src/hooks/useBoolean';
import { useGameCycle } from '@/src/hooks/useGameCycle';

import styles from './IngameStage.module.scss';
import type { IngameStageProps } from './IngameStage.props';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
});

const IngameStage: FC<IngameStageProps> = ({}) => {
  /** Прошедшее время. */
  const [lastedTime, setLastedTime] = useState<number>(60);
  /** Заработанные очки. */
  const [score, setScore] = useState<number>(0);
  /** Серия успешных ответов. */
  const [streak, setStreak] = useState<number>(1);
  /** Правильный ответ. */
  const [correctNum, setCorrectNum] = useState<number>(75);
  /** Текущий уровень. */
  const [level, setLevel] = useState<number>(1);
  /** Массив с пропсами карточек. */
  const [blocks, setBlocks] = useState<IBlock[]>([]);

  /** Цвет фона. */
  const [background, setBackground] =
    useState<CSSProperties['background']>('#4DB8ECFF');

  /** Состояние загрузки игры (загружена или нет). */
  const [gameIsLoading, toggleIsGameLoading, setIsGameLoading] =
    useBoolean(true);

  /**
   * Хук, предоставляющий интерфейс для взаимодействия с
   * состояниями игры.
   */
  const { goToNextStage, currentStage } = useGameCycle();

  /**
   * Эта функция позволяет получить размеры
   * сетки для разных уровней.
   */
  const getSizes = (): {
    css: Pick<CSSProperties, 'gridTemplateColumns' | 'gridTemplateRows'>;
    numbers: Record<'columns' | 'rows', number>;
  } => {
    /**
     * Если уровень равен 4 или более, то размер сетки -
     * 4 на 3.
     */
    if (level >= 4) {
      return {
        css: {
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(3, 1fr)',
        },
        numbers: {
          columns: 4,
          rows: 3,
        },
      };
    }

    /**
     * В любом другом случае размер сетки -
     * 3 на 2.
     */
    return {
      css: {
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
      },
      numbers: {
        columns: 3,
        rows: 2,
      },
    };
  };

  /**
   * Эта функция полностью занимается рандомной
   * генерацией карточек, новых чисел и т.д.
   */
  const generateCards = () => {
    setIsGameLoading(true);

    const generateNumber = (): number => {
      if ([1, 2].includes(level)) {
        return random.int(1, 99);
      }

      return random.int(1, 999);
    };

    const { columns, rows } = getSizes().numbers;

    const colorPool: string[] = ['#fc73b0', '#94c94d', '#8e3dcb'];
    const extendedColorPool: typeof colorPool = [...colorPool];

    const animationPool: Array<
      Defined<Exclude<Defined<IBlock['animation']>, 'no-animation'>>
    > = ['nothing-rotate', 'blink-nothing', 'scaleDown-nothing'];

    const newCorrectNum = generateNumber();

    let newBlocks: IBlock[] = new Array(columns * rows).fill(undefined);

    newBlocks = newBlocks.map(() => {
      return {
        number: generateNumber(),
        background: randomItem(extendedColorPool),
        animation: randomItem(animationPool),
      };
    });

    newBlocks[
      randomItem<number>(
        Object.keys(newBlocks).map(key => {
          return parseInt(`${key}`);
        })
      )
    ].number = newCorrectNum;

    setBlocks(newBlocks);
    setBackground(randomItem(colorPool));
    setCorrectNum(newCorrectNum);

    setIsGameLoading(false);
  };

  /** Отслеживаем момент окончания времени. */
  useEffect(() => {
    if (lastedTime <= 0) {
      goToNextStage();
    }
  }, [lastedTime]);

  /**
   * Генерируем новые карточки каждый раз при смене
   * уровня.
   */
  useEffect(() => {
    generateCards();
  }, [level]);

  /**
   * Эта фунция форматирует время из формата `360 секунд`
   * в `06:00`.
   *
   * @param {number} timeInSeconds           время в секундах.
   */
  const formatTime = (timeInSeconds: number) => {
    let minutes: string = `00`;
    let seconds: string = `00`;

    /**
     * Эта функция оборачивает число в формат XX.
     *
     * @param {number} num      изначальное число.
     */
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
          /**
           * Если ответ правильный и серия правильных
           * ответов меньше 5, то увеличиваем серию на 1.
           */
          if (answer === correctNum && streak < 5) {
            setStreak(prev => prev + 1);
          }

          /** Сбрасываем стрик при неправильном ответе. */
          if (answer !== correctNum) {
            setStreak(1);
          }

          /** Начисляем очки за правильный ответ здесь. */
          if (answer === correctNum) {
            const BASE_SCORE_PER_ANSWER = 41;

            setScore(prev => {
              const newValue = prev + BASE_SCORE_PER_ANSWER * streak;

              return parseInt(`${newValue}`);
            });
          }

          /** Переход на след. уровень. */
          setLevel(prev => prev + 1);

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
                ...getSizes().css,
              }}
            >
              {blocks.map((block, index) => {
                const { number, background, animation } = block;

                return (
                  <Block
                    key={`block-${index}`}
                    number={number}
                    background={background}
                    animation={animation}
                  />
                );
              })}
            </div>

            {gameIsLoading && (
              <div className={cn(styles.loader)}>
                <Loader primaryColor={'black'} />
              </div>
            )}
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
