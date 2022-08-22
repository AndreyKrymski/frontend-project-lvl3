// @ts-nocheck
import * as yup from 'yup';
import elements from './elementsDom.js';

function render(state) {
  if (state.isValid) {
    elements.textFeedback.textContent = 'RSS успешно загружен';
    elements.textFeedback.classList.add('text-success');
    elements.textFeedback.classList.remove('text-danger');
    elements.urlInput.classList.remove('is-invalid');
    elements.textBody.reset();
    elements.urlInput.focus();
  } else {
    elements.textFeedback.textContent = state.erorr.join();
    elements.urlInput.classList.remove('text-success');
    elements.urlInput.classList.add('is-invalid');
    elements.textFeedback.classList.remove('text-success');
    elements.textFeedback.classList.add('text-danger');
  }
}
export default () => {
  const state = {
    isValid: null,
    url: [],
    erorr: [],
  };
  // const watcheState = onChange(state, () => {
  //  render(state);
  // });

  const validateUrl = (link) => {
    const schema = yup.string().url('Ссылка должна быть валидным URL').notOneOf(state.url, 'RSS уже существует');
    return schema.validate(link)
      .then(() => {
        state.url.push(link);
        state.isValid = true;
        render(state);
      })
      .catch((e) => {
        state.erorr.push(e.message);
        state.isValid = false;
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
};
