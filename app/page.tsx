import cn from 'classnames';

import NumbersGame from '@/src/components/game/NumbersGame/NumbersGame';
import UiContainer from '@/src/components/ui/UiContainer/UiContainer';

export default function Home() {
  return (
    <main className={cn('py-[1.6rem]')}>
      <UiContainer className={cn('flex justify-center items-center')}>
        <NumbersGame />
      </UiContainer>
    </main>
  );
}
