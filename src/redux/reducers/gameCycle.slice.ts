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
    simpleAction(state, action: ReduxAction<any>) {},
  },
});

export default gameCycleSlice.reducer;
export const { simpleAction } = gameCycleSlice.actions;
export const initialGameCycleState = gameCycleSlice.getInitialState();
