'use server';

import { cookies } from 'next/headers';
import { COOKIE_NAME } from './constants';

import { getCookie, setCookie } from 'cookies-next';

async function getUserLocale() {
  return getCookie(COOKIE_NAME, { cookies });
}

async function setUserLocale(locale: UserLocale) {
  setCookie(COOKIE_NAME, locale, { cookies });
}

export { getUserLocale, setUserLocale }