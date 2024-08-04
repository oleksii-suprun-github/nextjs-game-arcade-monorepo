import { MouseEventHandler, JSX } from 'react';
import { useTranslations } from 'next-intl';
import { getPipClasses } from '../utils';

export interface DieProps {
  holdDieHandler: MouseEventHandler<HTMLButtonElement>;
  isHeld: boolean;
  value: number;
}

function Die({ holdDieHandler, isHeld, value: pipsAmount }: DieProps) {
  const t = useTranslations('Game');

  const hasHeldClass = isHeld ? 'bg-green-400' : '';
  const diePips: JSX.Element[] = [];
  for (let i = 1; i <= pipsAmount; i++) {
    diePips.push(
      <div
        className={`h-2.5 w-2.5 rounded-[50%] bg-black pips-${pipsAmount} pip-index-${i} ${getPipClasses(pipsAmount, i)}`}
        key={i}
      />,
    );
  }

  return (
    <button
      aria-label={`${t('labels.boardDieAria', { count: pipsAmount })}`}
      className={`relative m-5 flex h-[100px] w-[100px] cursor-pointer flex-wrap items-center justify-center gap-[22px] self-center justify-self-center rounded-[10px] border-0 bg-white font-[bold] text-[42px] shadow-[0_10px_10px_rgba(0,0,0,0.1)] ${hasHeldClass}`}
      data-testid="die"
      onClick={holdDieHandler}
    >
      {diePips}
    </button>
  );
}
export default Die;
