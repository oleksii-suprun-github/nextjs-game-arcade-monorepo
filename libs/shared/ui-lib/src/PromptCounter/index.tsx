'use client';

import { usePrompt } from '@context/PromptContext';
import { useTranslations } from 'next-intl';
import { FaQuestionCircle } from 'react-icons/fa';

function PromptCounter() {
  const t = useTranslations('Header');

  const { symbolsUsed, symbolsLimit, limitRenewalDate } = usePrompt();

  return (
    <div className="flex items-center">
      <p className="leading-6">
        {t.rich('labels.promptSymbolsRemaining', {
          symbolsUsed,
          symbolsLimit,
          strong: (chunks) => <strong>{chunks}</strong>,
        })}
      </p>

      <span
        className="tooltip tooltip-left ml-2 text-stone-300"
        data-tip={t('labels.promptSymbolsRenewalDate', { limitRenewalDate })}
      >
        <span className="cursor-pointer">
          <FaQuestionCircle />
        </span>
      </span>
    </div>
  );
}

export default PromptCounter;
