import capitalize from 'lodash-es/capitalize';
import { useLocale, useTranslations } from 'next-intl';

function RecordElement({ data, index }: { data: GameRecord; index: number }) {
  const locale = useLocale();
  const t = useTranslations('Records');

  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const gameSessionDate = new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: userTimezone,
  })
    .format(+data.date)
    .replace(',', ` ${t('at')}`);

  return (
    <tr className="record-element bg-slate-100">
      <td className="border border-gray-400 p-1.5 text-black">{index + 1}</td>
      <td className="border border-gray-400 p-1.5 text-black">{gameSessionDate}</td>
      <td className="border border-gray-400 p-1.5 text-black">
        {capitalize(data.difficultyLabel)}
      </td>
      <td className="border border-gray-400 p-1.5 text-black">{data.gameClicks}</td>
      <td className="border border-gray-400 p-1.5 text-black">{data.gameTime}s</td>
    </tr>
  );
}
export default RecordElement;
