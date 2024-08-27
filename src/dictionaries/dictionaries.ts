"use server"
import { TLang } from '@/types/language'
 
const dictionaries = {
  "en": () => import('./en.json').then((module) => module.default),
  "ru": () => import('./en.json').then((module) => module.default),
  "uk": () => import('./en.json').then((module) => module.default),
  "de": () => import('./en.json').then((module) => module.default),
}


export const getDictionary = async (locale: TLang) =>
  dictionaries[locale]?.() ?? dictionaries.en();