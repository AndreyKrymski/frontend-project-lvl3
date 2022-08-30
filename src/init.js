// @ts-nocheck
import * as yup from 'yup';
import i18next from 'i18next';
import onChange from 'on-change';
import axios from 'axios';
import parser from './parser.js';
import rend from './rendering.js';
import elements from './elementsDom.js';
import resources from './locales/index.js';
import render from './render.js';
import rendering from './renderingPostandFids.js';
import view from './view.js';

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
        activeLink: null,
        id: 0,
        rssFiles: [],
      };
      const watcheState = onChange(state, () => {
        render(state, i18nextInstance.t('status.valid'));
      });
      const watcheStateUrl = onChange(state, (path, value) => {
        axios.get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(value)}`)
          .then((response) => response.data.contents)
          .then((answer) => {
            const [xml, idNumber] = parser(answer, i18nextInstance.t('errors.errorValidRSS'), state);
            state.rssFiles.push(xml);
            state.id = idNumber;
            watcheState.statusValidation = 'valid';
            if (state.url.length === 0) {
              rendering(i18nextInstance.t('text.fids'), i18nextInstance.t('text.posts'));
              rend(xml);
            } else {
              rend(xml);
            }
            state.url.push(value);
            const buttonPost = document.querySelectorAll('[data-bs-toggle="modal"]');
            buttonPost.forEach((it) => {
              it.addEventListener('click', (e) => {
                e.preventDefault();
                const objectID = state.rssFiles.flatMap((item) => item.posts)
                  .filter((iter) => iter.id === Number(e.target.dataset.id));
                view(...objectID);
              });
            });
          })
          .catch((e) => {
            state.statusValidation = 'invalid';
            watcheState.erorr = e.message;
          });
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
            watcheStateUrl.activeLink = link;
            state.statusValidation = 'processing';
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
