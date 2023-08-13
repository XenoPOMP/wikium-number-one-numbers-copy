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

    changeStage(state, action: ReduxAction<GameCycleState['stage']>) {
      state.stage = action.payload;
    },
  },
});

export default gameCycleSlice.reducer;
export const { nextStage, changeStage } = gameCycleSlice.actions;
export const initialGameCycleState = gameCycleSlice.getInitialState();
