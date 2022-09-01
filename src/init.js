// @ts-nocheck
import i18next from 'i18next';
import onChange from 'on-change';
import axios from 'axios';
import parser from './parser.js';
import elements from './elementsDom.js';
import resources from './locales/index.js';
import render from './render.js';
import renderPostAndFeeds from './renderingPostandFids.js';
import renderButtonPosts from './renderButtonPosts.js';
import validateUrl from './validateUrl.js';
import renderProccess from './isProcess.js';

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
        url: [],
        rssFiles: [],
        statusValidation: false,
        isProcessing: false,
        erorr: null,
      };
      const watcheState = onChange(state, (path, value) => {
        if (path === 'isProcessing') {
          renderProccess(value);
        } else if (path === 'erorr') {
          render(path, value);
        } else if (path === 'statusValidation') {
          render(path, i18nextInstance.t('status.valid'));
          renderPostAndFeeds(state, i18nextInstance);
          renderButtonPosts(state);
        }
      });

      elements.textBody.addEventListener('submit', (e) => {
        e.preventDefault();
        watcheState.isProcessing = true;
        const form = new FormData(e.target);
        const value = form.get('url');
        validateUrl(value, state, i18nextInstance)
          .then(() => axios.get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(value)}`))
          .then((response) => {
            const objectPostandFeeds = parser(response.data.contents, i18nextInstance.t('errors.errorValidRSS'));
            state.url.push(value);
            state.rssFiles.push(objectPostandFeeds);
            watcheState.statusValidation = true;
            state.statusValidation = false;
          })
          .catch((error) => {
            watcheState.erorr = error.message;
            state.erorr = '';
          })
          .finally(() => {
            watcheState.isProcessing = false;
          });
      });
    });
};
