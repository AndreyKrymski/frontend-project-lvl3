// @ts-nocheck
import * as yup from 'yup';
import i18next from 'i18next';
import onChange from 'on-change';
import elements from './elementsDom.js';
import resources from './locales/index.js';
import render from './render.js';

export default () => {
  const defaultLng = 'ru';
  const i18nextInstance = i18next.createInstance();
  return i18nextInstance.init({
    lng: defaultLng,
    debug: true,
    resources,
  })
    .then(() => {
      const state = {
        statusValidation: null,
        url: [],
        erorr: null,
      };
      const watcheState = onChange(state, () => {
        render(state, i18nextInstance);
      });

      const validateUrl = (link) => {
        yup.setLocale({
          mixed: {
            notOneOf: () => i18nextInstance.t('errors.errorsDuplication'),
          },
          string: {
            url: () => i18nextInstance.t('errors.errorsUrl'),
          },
        });
        const schema = yup.string().url().notOneOf(state.url);
        return schema.validate(link)
          .then(() => {
            state.url.push(link);
            state.statusValidation = 'valid';
            watcheState.erorr = '';
          })
          .catch((e) => {
            state.statusValidation = 'invalid';
            watcheState.erorr = e.message;
          });
      };

      elements.textBody.addEventListener('submit', (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const value = form.get('url');
        validateUrl(value);
      });
    });
};
