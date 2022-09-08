/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
// @ts-nocheck
import i18next from 'i18next';
import onChange from 'on-change';
import _ from 'lodash';
import axios from 'axios';
import parser from './parser.js';
import elements from './elementsDom.js';
import resources from './locales/index.js';
import renderMessage from './renderMessage.js';
import renderFeeds from './renderFeeds.js';
import renderPosts from './renderPosts.js';
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
        data: {
          posts: [],
          url: [],
          feeds: [],
        },
        statusValidation: false,
        isProcessing: false,
        message: null,
      };
      const watcheState = onChange(state, (path) => {
        if (path === 'isProcessing') {
          renderProccess(state.isProcessing);
        } else if (path === 'message') {
          renderMessage(state, i18nextInstance);
        } else if (path === 'data.feeds') {
          renderFeeds(state, i18nextInstance);
        } else if (path === 'data.posts') {
          renderPosts(state, i18nextInstance);
          renderButtonPosts(state);
        }
      });
      function updatePosts() {
        if (state.data.posts.length !== 0) {
          const response = state.data.url.map((url) => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`));
          Promise.all(response)
            .then((xmls) => xmls.map((xml) => parser(xml.data.contents)))
            .then((feeds) => {
              const different = feeds.flatMap((item) => item.posts)
                .filter((it) => !state.data.posts.map((ir) => ir.link).includes(it.link));
              different.forEach((post) => {
                post.id = _.uniqueId();
              });
              watcheState.data.posts.unshift(...different);
            })
            .catch((error) => {
              console.log(error.message);
            });
        }
        setTimeout(updatePosts, 5000);
      }
      updatePosts();

      elements.textBody.addEventListener('submit', (e) => {
        e.preventDefault();
        watcheState.isProcessing = true;
        const form = new FormData(e.target);
        const url = form.get('url');
        validateUrl(url, state, i18nextInstance)
          .then(() => axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`))
          .then((response) => {
            const { feed, posts } = parser(response.data.contents, i18nextInstance.t('errors.errorValidRSS'));
            const feedId = _.uniqueId();
            feed.feedId = feedId;
            posts.forEach((post) => {
              post.id = _.uniqueId();
              post.feedId = feedId;
            });
            state.statusValidation = true;
            watcheState.message = i18nextInstance.t('status.valid');
            state.data.url.push(url);
            watcheState.data.feeds.push(feed);
            watcheState.data.posts.unshift(...posts);
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
