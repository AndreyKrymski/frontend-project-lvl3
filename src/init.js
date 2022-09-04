// @ts-nocheck
import i18next from 'i18next';
import onChange from 'on-change';
import _ from 'lodash';
import axios from 'axios';
import parser from './parser.js';
import elements from './elementsDom.js';
import resources from './locales/index.js';
import render from './render.js';
import renderPostAndFeeds from './renderPostandFids.js';
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
        message: null,
        id: 0,
      };
      function updatePosts() {
        const response = state.url.map((url) => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`));
        Promise.all(response)
          .then((xmls) => xmls.map((xml) => parser(xml.data.contents)))
          .then((feeds) => {
            if (state.rssFiles.length !== 0) {
              const posts = feeds.flatMap((item) => item.post)
                .filter((it) => !state.rssFiles.flatMap((ite) => ite.post)
                  .map((iter) => iter.link).includes(it.link));
              posts.flatMap((index) => index.id = _.uniqueId());
              watcheState.rssFiles.flatMap((item) => item.post.unshift(...posts));
              console.log(posts);
            }
          })
          .catch((error) => {
            console.log(error);
          });
        setTimeout(updatePosts, 5000);
      }
      updatePosts();

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
        const url = form.get('url');
        validateUrl(url, state, i18nextInstance)
          .then(() => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`))
          .then((response) => {
            const feed = parser(response.data.contents, i18nextInstance.t('errors.errorValidRSS'));
            feed.post.forEach((item) => item.id = _.uniqueId());
            state.statusValidation = true;
            watcheState.message = i18nextInstance.t('status.valid');
            state.url.push(url);
            watcheState.rssFiles.push(feed);
          })
          .catch((error) => {
            watcheState.message = error.message;
          })
          .finally(() => {
            watcheState.isProcessing = false;
            state.message = '';
            state.statusValidation = false;
          });
      });
    });
};
