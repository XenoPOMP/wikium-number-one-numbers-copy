import cn from 'classnames';

import UiContainer from '@/src/components/ui/UiContainer/UiContainer';

export default function Home() {
  return (
    <main className={cn('py-[1.6rem]')}>
      <UiContainer className={cn('flex justify-center items-center')}>
        index page
      </UiContainer>
    </main>
  );
}
