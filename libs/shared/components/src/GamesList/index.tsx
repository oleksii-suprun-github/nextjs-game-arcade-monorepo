'use client';

import { Heading } from '@global-ui-lib';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

function GamesList({ entries }: { entries?: unknown }) {
  const t = useTranslations('GamesList');

  return (
    <>
      <Heading>{t('headline')}</Heading>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        <div className="card bg-base-100 shadow-xl">
          <Link href="/games/tenzies">
            <figure className="rounded-tl-xl rounded-tr-xl">
              <img
                alt="Tenzies game play now"
                height="auto"
                src="/assets/apps/tenzies-preview.png"
                width="100%"
              />
            </figure>
            <div className="card-body">
              <h1 className="card-title">Tenzies</h1>
              <p className="mb-5">{t('games.tenzies.description')}</p>
              <div className="card-actions justify-end">
                <button className="btn bg-yellow-500 text-black hover:bg-yellow-400">
                  {t('buttons.play')}
                </button>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default GamesList;
