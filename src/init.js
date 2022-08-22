// @ts-nocheck
import * as yup from 'yup';
import elements from './elementsDom.js';
import resources from './locales/index.js';
import i18next from 'i18next';
import render from './render.js'


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
      status: null,
      isValid: null,
      url: [],
      erorr: [],
    };
    // const watcheState = onChange(state, () => {
    //  render(state);
    // });
  
    const validateUrl = (link) => {
      const schema = yup.string().url(i18nextInstance.t('errors.errorsUrl')).notOneOf(state.url, i18nextInstance.t('errors.errorsDuplication'));
      return schema.validate(link)
        .then(() => {
          state.url.push(link);
          state.status = 'valid';
          render(state, i18nextInstance);
        })
        .catch((e) => {
          state.erorr.push(e.message);
          state.status = 'invalid';
          render(state);
        })
        .finally(() => {
          state.erorr = [];
        });
    };
  
    elements.textBody.addEventListener('submit', (e) => {
      e.preventDefault();
      const form = new FormData(e.target);
      const value = form.get('url');
      validateUrl(value);
    });



  })
 


    
  
};
