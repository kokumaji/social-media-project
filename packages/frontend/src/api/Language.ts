import LocaleFile from "@koku-app/lib_backend/src/locale/Locale";

const dataFile: LocaleFile = new LocaleFile();

export const getLocale = (key: string) => { return dataFile.getLocale(key) }

export const projectName = dataFile.getVariable('project-name');