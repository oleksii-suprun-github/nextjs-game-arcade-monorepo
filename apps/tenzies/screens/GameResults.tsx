'use client';

import { MouseEventHandler } from 'react';
import { useTranslations } from 'next-intl';
import { RollDiceButton, Header } from '../components';

export interface GameResultsProps {
  timeTotal: number;
  clicksTotal: number;
  restartHandler: MouseEventHandler<HTMLButtonElement>;
}

function GameResults({ timeTotal, clicksTotal, restartHandler }: GameResultsProps) {
  const resultsText = useTranslations('Results');
  const gameText = useTranslations('Game');
  return (
    <>
      <Header>
        <h1 className="mb-6 text-3xl font-extrabold leading-none text-stone-300">
          {resultsText('headline')}
        </h1>
        <p className="text-lg text-stone-300">{resultsText('description')}</p>
      </Header>
      <div className="mx-auto my-0 mt-[50px]" id="results">
        <p className="mb-5 text-stone-300">
          {resultsText('totalTime')}:&nbsp;
          <strong>
            {timeTotal} {gameText('seconds')}
          </strong>
        </p>
        <p className="text-stone-300">
          {resultsText('totalClicks')}:&nbsp;
          <strong>
            {clicksTotal} {gameText('clicks')}
          </strong>
        </p>
      </div>
      <RollDiceButton onClick={restartHandler}>{gameText('buttons.reset')}</RollDiceButton>
    </>
  );
}

export default GameResults;
