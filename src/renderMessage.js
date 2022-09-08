import elements from './elementsDom.js';

export default function renderMessage(state, i18nextInstance) {
  if (state.statusValidation) {
    elements.textFeedback.classList.replace('text-danger', 'text-success');
    elements.urlInput.classList.remove('is-invalid');
    elements.textBody.reset();
    elements.urlInput.focus();
  } else {
    elements.urlInput.classList.add('is-invalid');
    elements.textFeedback.classList.replace('text-success', 'text-danger');
  }
  if (state.message === 'Network Error') {
    elements.textFeedback.textContent = i18nextInstance.t('errors.netWork');
  } else {
    elements.textFeedback.textContent = state.message;
  }
}
