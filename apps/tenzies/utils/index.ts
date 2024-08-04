/* eslint-disable @typescript-eslint/no-unsafe-return */
import { nanoid } from 'nanoid';
import { getTranslations } from 'next-intl/server';
import { orderBy, take } from 'lodash-es';

declare global {
  interface Window {
    Cypress?: {
      env: any;
    };
  }
}

export const Difficulties = [
  { label: 'easy', value: 5 },
  { label: 'normal', value: 10 },
  { label: 'hard', value: 15 },
];

export const getRandomDieValue = (): number => Math.ceil(Math.random() * 6);

export const setNewDiceSet = (difficulty = 10): Dice[] => {
  const dicesArr: Dice[] = [];
  for (let i = 0; i < difficulty; i++) {
    dicesArr.push({ id: nanoid(), value: getRandomDieValue(), isHeld: false });
  }
  return dicesArr;
};

export const diceHoldHandler = (dice: any[]) =>
  dice.map((die: { isHeld: any }) => {
    if (!die.isHeld) {
      return {
        ...die,
        value: getRandomDieValue(),
      };
    }
    return die;
  });

export const filterRecordsASC = (records: GameRecord[]) =>
  take(orderBy(records, ['gameClicks', 'gameTime'], ['asc', 'asc']), 5);

export const getPipClasses = (pipsAmount: number, index: number) => {
  switch (pipsAmount) {
    case 4:
      if (index === 2) return 'relative bottom-[-61px] left-[-32px]';
      if (index === 4) return 'relative right-[-31px]';
      break;
    case 5:
      if (index === 2) return 'relative top-[30px]';
      if (index === 4) return 'relative left-[-15px]';
      if (index === 5) return 'relative right-[-15px]';
      break;
    default:
      return '';
  }
  return '';
};

/**
 * This function is designed to work only with Cypress for end-to-end testing. It is not used in production build.
 */
export const checkAndSetGameWonForCypress = (
  allDice: Dice[],
  setGameWon: (value: boolean) => void,
  setRecordsList: (value: (prevRecordsList: GameRecord[]) => GameRecord[]) => void,
  difficulty: GameDifficulty,
  gameTime: number,
  gameClicks: number,
): void => {
  if (
    window?.Cypress?.env('skipRollDice') &&
    import.meta.env.DEV &&
    allDice.every((die) => die.isHeld)
  ) {
    setGameWon(true);
    setRecordsList((prevRecordsList) =>
      filterRecordsASC([
        {
          id: nanoid(),
          date: Date.now().toString(),
          difficultyLabel: difficulty.label,
          gameTime,
          gameClicks,
        },
        ...prevRecordsList,
      ]),
    );
  }
};
