// @ts-nocheck
import i18next from 'i18next';
import onChange from 'on-change';
import axios from 'axios';
import parser from './parser.js';
import elements from './elementsDom.js';
import resources from './locales/index.js';
import render from './render.js';
import renderPostAndFeeds from './renderPostandFids.js';
import renderButtonPosts from './renderButtonPosts.js';
import validateUrl from './validateUrl.js';
import renderProccess from './isProcess.js';
import startTimer from './startTimer.js';

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
        message: null,
      };
      const watcheState = onChange(state, (path) => {
        if (path === 'isProcessing') {
          renderProccess(state.isProcessing);
        } else if (path === 'message') {
          render(state);
        } else if (path === 'rssFiles') {
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
            const postandFeeds = parser(response.data.contents, i18nextInstance.t('errors.errorValidRSS'));
            state.statusValidation = true;
            watcheState.message = i18nextInstance.t('status.valid');
            state.url.push(value);
            watcheState.rssFiles.push(postandFeeds);
            state.statusValidation = false;
          })
          .catch((error) => {
            state.statusValidation = false;
            watcheState.message = error.message;
            state.message = '';
          })
          .finally(() => {
            watcheState.isProcessing = false;
            //startTimer(state);
          });
      });
    });
};
