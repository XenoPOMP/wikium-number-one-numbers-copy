import { Defined } from '@xenopomp/advanced-types';
import cn from 'classnames';
import Image from 'next/image';
import { FC, ReactNode } from 'react';

import eyeExpand from '@/public/eye-expand.svg';
import eyeIcon from '@/public/eye-icon.svg';
import eyeThree from '@/public/eye-three.svg';

import styles from '../TutorialStage.module.scss';

import type { StageStepProps } from './StageStep.props';

const StageStep: FC<StageStepProps> = ({
  icon = 'eye',
  heading,
  paragraphs,
}) => {
  const allIcons: Record<Defined<StageStepProps['icon']>, ReactNode> = {
    eye: <Image src={eyeIcon} alt={'Eye icon'} className={cn(styles.icon)} />,

    'eye-expand': (
      <Image
        src={eyeExpand}
        alt={'Eye expand icon'}
        className={cn(styles.icon)}
      />
    ),

    'eye-three': (
      <Image src={eyeThree} alt={'Eye icon'} className={cn(styles.icon)} />
    ),
  };

  return (
    <li className={cn(styles.step)}>
      <header>
        {allIcons[icon]}

        <h3>{heading}</h3>
      </header>

      <>
        {paragraphs?.map((paragraph, index) => (
          <p key={`paragraph-${index}`}>{paragraph}</p>
        ))}
      </>
    </li>
  );
};

export default StageStep;
