import { useTranslations } from 'next-intl';

function DifficultySelector({ difficultyHandler }: { difficultyHandler: (param: string) => void }) {
  const t = useTranslations('Game');
  return (
    <section className="mt=[35px] flex w-full flex-col items-center justify-center" id="difficulty">
      <h2 className="mb-4 mt-10 text-center text-2xl font-extrabold text-stone-300">
        {t('difficultyHeadline')}:
      </h2>
      <select
        aria-label={`${t('labels.difficultyAria')}`}
        className="select select-bordered bg-slate-800"
        data-testid="difficulty-selector"
        defaultValue="normal"
        name="difficulty"
        onChange={(e) => difficultyHandler(e.target.value)}
      >
        <option value="easy">{t('labels.difficultyEasy')}</option>
        <option value="normal">{t('labels.difficultyNormal')}</option>
        <option value="hard">{t('labels.difficultyHard')}</option>
      </select>
    </section>
  );
}
export default DifficultySelector;
