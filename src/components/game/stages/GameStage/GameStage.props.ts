import { Stage } from '@pixi/react';
import { PropsWith } from '@xenopomp/advanced-types';
import { ComponentProps } from 'react';

export interface GameStageProps
  extends ComponentProps<typeof Stage>,
    PropsWith<'children' | 'className', {}> {}
