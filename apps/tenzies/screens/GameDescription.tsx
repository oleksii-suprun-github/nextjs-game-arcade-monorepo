'use client';

import { MouseEventHandler } from 'react';
import { useTranslations } from 'next-intl';
import Header from '../components/Header';
import RecordsTable from '../components/RecordsTable';
import DifficultySelector from '../components/DifficultySelector';
import RollDiceButton from '../components/RollDiceButton';

export interface GameDescriptionProps {
  startHandler: MouseEventHandler<HTMLButtonElement>;
  difficultyHandler: (param: string) => void;
  records?: GameRecord[];
}

function GameDescription({ startHandler, difficultyHandler, records }: GameDescriptionProps) {
  const t = useTranslations('Game');

  return (
    <>
      <Header>
        <h1 className="mb-6 mt-5 text-3xl font-extrabold leading-none text-stone-300">
          🎲 Tenzies
        </h1>
        <p className="text-lg text-stone-300">{t('description')}</p>
      </Header>
      {!!records?.length && <RecordsTable data={records} />}
      <DifficultySelector difficultyHandler={difficultyHandler} />
      <RollDiceButton onClick={startHandler}>{t('buttons.start')}</RollDiceButton>
    </>
  );
}
export default GameDescription;
