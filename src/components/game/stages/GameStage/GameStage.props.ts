import { Stage } from '@pixi/react';
import { PropsWith } from '@xenopomp/advanced-types';
import { ComponentProps } from 'react';

export type GameStageProps = PropsWith<'children' | 'className', {}> &
  (
    | ({
        usePixi: true;
      } & ComponentProps<typeof Stage>)
    | {
        usePixi: false;
      }
  );
