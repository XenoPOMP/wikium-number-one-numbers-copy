'use client';

import { createSlice } from '@reduxjs/toolkit';

import { GameStage } from '@/src/enums/GameStage';

import type { ReduxAction } from '../types';

export type GameCycleState = {
  stage: GameStage;
};

const initialState: GameCycleState = {
  stage: GameStage.TUTORIAL,
};

const gameCycleSlice = createSlice({
  name: 'gameCycle',
  initialState,
  reducers: {
    nextStage(state, action: ReduxAction<undefined>) {
      state.stage++;
    },
  },
});

export default gameCycleSlice.reducer;
export const { nextStage } = gameCycleSlice.actions;
export const initialGameCycleState = gameCycleSlice.getInitialState();
