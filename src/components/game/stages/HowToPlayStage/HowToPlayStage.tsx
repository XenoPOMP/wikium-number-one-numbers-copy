import { Stage } from '@pixi/react';
import cn from 'classnames';
import { Montserrat, Open_Sans } from 'next/font/google';
import Image from 'next/image';
import { FC } from 'react';

import { AppConstants } from '@/app/app.constants';
import handImage from '@/public/pointer-hand.svg';
import BaseStage from '@/src/components/game/stages/BaseStage/BaseStage';
import BaseGameStage from '@/src/components/game/stages/GameStage/BaseGameStage';
import { useGameCycle } from '@/src/hooks/useGameCycle';

import styles from './HowToPlayStage.module.scss';
import type { HowToPlayStageProps } from './HowToPlayStage.props';

const openSans = Open_Sans({
  subsets: ['latin', 'cyrillic'],
});

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
});

const HowToPlayStage: FC<HowToPlayStageProps> = () => {
  const { inlinePadding } = AppConstants.gameSizeConstraints;
  const { goToNextStage } = useGameCycle();

  return (
    <BaseStage
      className={cn(`flex justify-center items-center`, openSans.className)}
      style={{
        padding: `${inlinePadding}px`,
      }}
    >
      <article
        className={cn(styles.stageBody)}
        onClick={() => {
          goToNextStage();
        }}
      >
        <header>
          <p>Найдите указанное число:</p>

          <p className={cn(styles.number, montserrat.className)}>75</p>
        </header>

        <div className={cn(styles.grid, montserrat.className)}>
          <Image src={handImage} alt={'Hand'} className={cn(styles.hand)} />

          <div className={cn(styles.block, 'bg-[#f28e37]')}>75</div>

          <div className={cn(styles.block, styles.transparent, 'bg-[#fc73b0]')}>
            1
          </div>

          <div className={cn(styles.block, styles.transparent, 'bg-[#8e3dcb]')}>
            35
          </div>

          <div className={cn(styles.block, styles.transparent, 'bg-[#94c94d]')}>
            7
          </div>

          <div className={cn(styles.block, styles.transparent, 'bg-[#94c94d]')}>
            885
          </div>

          <div className={cn(styles.block, styles.transparent)}>40</div>
        </div>

        <footer>
          <p>Нажмите на экран,</p>
          <p>чтобы продолжить</p>
        </footer>
      </article>
    </BaseStage>
  );
};

export default HowToPlayStage;
