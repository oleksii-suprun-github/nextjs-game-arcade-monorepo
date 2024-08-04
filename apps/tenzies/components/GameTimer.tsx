import { useTranslations } from 'next-intl';

function GameTimer({ value }: { value: number }) {
  const t = useTranslations('Game');
  return (
    <div className="absolute right-[25px] top-[15px] text-lg" id="game-timer">
      <strong>{t('time')}: </strong>
      {value}
      <span>s</span>
    </div>
  );
}
export default GameTimer;
