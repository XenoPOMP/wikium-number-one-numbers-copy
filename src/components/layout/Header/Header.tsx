import { SiGithub } from '@icons-pack/react-simple-icons';
import cn from 'classnames';
import Link from 'next/link';
import { FC } from 'react';

import UiContainer from '@/src/components/ui/UiContainer/UiContainer';

import styles from './Header.module.scss';
import type { HeaderProps } from './Header.props';

const Header: FC<HeaderProps> = ({}) => {
  return (
    <header className={cn(styles.appHeader)}>
      <UiContainer className={cn(styles.container)}>
        <Link href={'/'} className={cn('font-semibold')}>
          Number one Numbers
        </Link>

        <article className={cn(styles.socialMedia)}>
          <Link
            href={'https://github.com/XenoPOMP/wikium-number-one-numbers-copy'}
          >
            <SiGithub color={'white'} />
          </Link>
        </article>
      </UiContainer>
    </header>
  );
};

export default Header;
