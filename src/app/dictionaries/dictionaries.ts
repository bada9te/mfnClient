"use server"
import { TLang } from '@/types/language'
import { cookies } from 'next/headers';
 
const dictionaries = {
  "en": () => import('./en.json').then((module) => module.default),
  "ru": () => import('./ru.json').then((module) => module.default),
  "uk": () => import('./uk.json').then((module) => module.default),
  "de": () => import('./de.json').then((module) => module.default),
}


export const getDictionary = async (locale: TLang) => {
  let preffrerdlanguage = cookies().get("language")?.value || locale;
  return dictionaries[preffrerdlanguage as TLang]?.() ?? dictionaries.en();
}