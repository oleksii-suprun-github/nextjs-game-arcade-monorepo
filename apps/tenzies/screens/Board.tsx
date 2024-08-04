'use client';

import { useTranslations } from 'next-intl';
import RollDiceButton from '../components/RollDiceButton';
import Header from '../components/Header';
import Die from '../components/Die';

export interface BoardProps {
  allDice: Dice[];
  difficulty: GameDifficulty;
  isRollDisabled: boolean;
  rollDicesHandler: () => void;
  holdDieHandler: (arg: string) => void;
}

function Board({
  allDice,
  difficulty,
  isRollDisabled = false,
  rollDicesHandler,
  holdDieHandler,
}: BoardProps) {
  const t = useTranslations('Game');

  const dice = allDice.map((die) => (
    <Die
      holdDieHandler={() => holdDieHandler(die.id)}
      isHeld={die.isHeld}
      key={die.id}
      value={die.value}
    />
  ));

  return (
    <>
      <Header>
        <h1
          className="mb-12 mt-12 text-4xl font-extrabold leading-none"
          data-testid="board-headline"
        >
          {t('boardHeadline', { difficulty: difficulty.value })}
        </h1>
      </Header>
      <section className="flex w-full flex-col items-center justify-center">
        {dice && (
          <div className="flex flex-wrap justify-center" id="dice-container">
            {dice}
          </div>
        )}
        <RollDiceButton disabled={isRollDisabled} onClick={rollDicesHandler}>
          {t('buttons.rollDice')}
        </RollDiceButton>
      </section>
    </>
  );
}
export default Board;
