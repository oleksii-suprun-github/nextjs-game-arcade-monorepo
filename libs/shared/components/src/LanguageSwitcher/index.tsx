'use client';

import { MouseEvent } from 'react';
import { GrLanguage } from 'react-icons/gr';
import { setUserLocale } from '@utils/locales';

function LanguageSwitcher() {
  const languages = [
    { label: 'English', value: 'en' },
    { label: 'Deutsch', value: 'de' },
  ];

  const handleLanguageChange = (e: MouseEvent<HTMLAnchorElement>, language: UserLocale) => {
    e.preventDefault();
    setUserLocale(language);
    const elem = document.activeElement as HTMLElement;
    if (elem) {
      elem?.blur();
    }
  };

  return (
    <div className="dropdown dropdown-left dropdown-hover ml-auto">
      <div
        className="btn m-1 border-0 bg-slate-800 text-stone-300 hover:bg-slate-800"
        role="button"
        tabIndex={0}
      >
        <GrLanguage />
      </div>
      <ul
        className="menu dropdown-content rounded-box z-[1] w-52 bg-slate-800 p-2 shadow"
        tabIndex={0}
      >
        {languages.map((language, index) => (
          <li key={index}>
            <a
              className="text-stone-300"
              href="#"
              onClick={(e) => handleLanguageChange(e, language.value as UserLocale)}
            >
              {language.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LanguageSwitcher;
