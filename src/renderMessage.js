import elements from './elementsDom.js';

export default function renderMessage(state) {
  if (state.statusValidation) {
    elements.textFeedback.classList.replace('text-danger', 'text-success');
    elements.urlInput.classList.remove('is-invalid');
    elements.textBody.reset();
    elements.urlInput.focus();
  } else {
    elements.urlInput.classList.add('is-invalid');
    elements.textFeedback.classList.replace('text-success', 'text-danger');
  }
  elements.textFeedback.textContent = state.message;
}
