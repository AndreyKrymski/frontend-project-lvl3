// @ts-nocheck
import i18next from 'i18next';
import onChange from 'on-change';
import axios from 'axios';
import parser from './parser.js';
import elements from './elementsDom.js';
import resources from './locales/index.js';
import render from './render.js';
import renderPostAndFeeds from './renderingPostandFids.js';
import view from './view.js';
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
        isProcessing: null,
        url: [],
        erorr: null,
        rssFiles: [],
      };
      const watcheState = onChange(state, (path, value) => {
        if (path === 'isProcessing') {
          renderProccess(value);
        } else if (path === 'erorr') {
          render(state);
        } else if (path === 'statusValidation') {
          render(state, i18nextInstance.t('status.valid'));
          renderPostAndFeeds(state, i18nextInstance);
          const buttonPost = document.querySelectorAll('[data-bs-toggle="modal"]');
          buttonPost.forEach((item) => {
            item.addEventListener('click', (e) => {
              e.preventDefault();
              const objectID = state.rssFiles.flatMap((it) => it.posts)
                .filter((iter) => iter.id === e.target.dataset.id);
              view(...objectID);
            });
          });
        }
      });

      elements.textBody.addEventListener('submit', (e) => {
        e.preventDefault();
        watcheState.isProcessing = 'processing';
        const form = new FormData(e.target);
        const value = form.get('url');
        state.statusValidation = null;
        validateUrl(value, state, i18nextInstance)
          .then(() => {
            state.erorr = '';
            axios.get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(value)}`)
              .then((response) => {
                const objXml = parser(response.data.contents, i18nextInstance.t('errors.errorValidRSS'), state);
                watcheState.isProcessing = 'processingCompleted';
                state.erorr = '';
                state.url.push(value);
                state.rssFiles.push(objXml);
                watcheState.statusValidation = 'valid';
              })
              .catch((error) => {
                state.statusValidation = 'invalid';
                watcheState.isProcessing = 'processingCompleted';
                watcheState.erorr = error.message;
              });
          })
          .catch((error) => {
            state.statusValidation = 'invalid';
            watcheState.isProcessing = 'processingCompleted';
            watcheState.erorr = error.message;
          });
      });
    });
};
