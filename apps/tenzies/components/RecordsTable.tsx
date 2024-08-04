import { useTranslations } from 'next-intl';
import RecordElement from './RecordElement';

function RecordsTable({ data: records }: { data: GameRecord[] }) {
  const t = useTranslations('Records');

  const recordsElements = records.map((record, index) => (
    <RecordElement data={record} index={index} key={record.id} />
  ));

  return (
    <section
      className="mt-[50px] flex w-full flex-col items-center justify-center"
      data-testid="records-list"
      id="records-list"
    >
      <h2 className="mb-4 text-center text-xl font-extrabold text-stone-300">{t('headline')}:</h2>
      <div
        className="relative w-full overflow-x-auto"
        data-testid="records-table"
        id="records-table-responsive-wrapper"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <table className="table-sm table" id="records-table">
          <thead className="">
            <tr className="border-separate bg-slate-800 text-center text-stone-300">
              <th className="border border-gray-400 text-base">#</th>
              <th className="border border-gray-400 text-base">{t('date')}</th>
              <th className="border border-gray-400 text-base">{t('date')}</th>
              <th className="border border-gray-400 text-base">{t('totalClicks')}</th>
              <th className="border border-gray-400 text-base">{t('totalTime')}</th>
            </tr>
          </thead>
          <tbody className="text-center">{recordsElements}</tbody>
        </table>
      </div>
    </section>
  );
}
export default RecordsTable;
