import { FC, createContext } from 'react';

const IngameContext = createContext<{
  currentCorrectNum: number;
  checkAnswer: (answer: number) => boolean;
  level: number;
}>({
  currentCorrectNum: 0,
  checkAnswer: () => false,
  level: 1,
});

export default IngameContext;
