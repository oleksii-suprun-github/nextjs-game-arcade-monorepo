'use client';

import { useWindowSize } from 'usehooks-ts';
import Confetti from 'react-confetti';

import { Navbar } from '@global-components';
import { GameTimer } from '../components';
import GameDescription from '../screens/GameDescription';
import GameResults from '../screens/GameResults';
import Board from '../screens/Board';

import useGameLogic from '../hooks/useGameLogic';

function TenziesGame() {
  const { width, height } = useWindowSize();
  const {
    difficulty,
    allDice,
    isGameWon,
    isGameStarted,
    isAllDiceEqual,
    isAllDiceSelected,
    recordsList,
    gameTime,
    gameClicks,
    difficultyHandler,
    rollDicesHandler,
    holdDieHandler,
  } = useGameLogic();

  return (
    <>
      <Navbar />

      <div className="flex min-h-svh justify-center">
        <article className="relative flex w-full max-w-[800px] flex-col flex-wrap justify-center self-center bg-slate-700 px-[50px] py-[75px] shadow-md sm:my-16 sm:w-[80%] sm:rounded-xl xl:m-[25px] xl:h-auto xl:w-[90%] xl:p-[25px]">
          {isGameStarted && !isGameWon && (
            <>
              <GameTimer value={gameTime} />
              <Board
                allDice={allDice}
                difficulty={difficulty}
                holdDieHandler={holdDieHandler}
                isRollDisabled={isAllDiceSelected && !isAllDiceEqual}
                rollDicesHandler={rollDicesHandler}
              />
            </>
          )}
          {!isGameStarted && (
            <GameDescription
              difficultyHandler={difficultyHandler}
              records={recordsList}
              startHandler={rollDicesHandler}
            />
          )}
          {isGameWon && (
            <GameResults
              clicksTotal={gameClicks}
              restartHandler={rollDicesHandler}
              timeTotal={gameTime}
            />
          )}
        </article>
        {isGameWon && <Confetti height={height} width={width} />}
      </div>
    </>
  );
}

export default TenziesGame;
