import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

// add
// "resolveJsonModule": true,
// in compilerOptions in tsconfig.json
// restart dev server
import enComponents from './en/components.json';
import enEnums from './en/enums.json';

// call in main.tsx
export const initI18n = () =>
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources: {
        en: {
          components: enComponents,
          enums: enEnums,
        },
      },
      lng: 'en', // if you're using a language detector, do not define the lng option
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
      },
    });

export const useComponentsTranslation = (componentName?: string) =>
  useTranslation(
    'components',
    componentName ? { keyPrefix: componentName } : undefined
  );

export const useEnumsTranslation = (enumName?: string) =>
  useTranslation('enums', enumName ? { keyPrefix: enumName } : undefined);
