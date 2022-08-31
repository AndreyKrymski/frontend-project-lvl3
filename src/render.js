import elements from './elementsDom.js';

export default function render(state, message) {
  if (state.statusValidation === 'valid') {
    elements.textFeedback.textContent = message;
    elements.textFeedback.classList.replace('text-danger', 'text-success');
    elements.urlInput.classList.remove('is-invalid');
    elements.textBody.reset();
    elements.urlInput.focus();
  } else if (state.statusValidation === 'invalid') {
    elements.textFeedback.textContent = state.erorr;
    elements.urlInput.classList.add('is-invalid');
    elements.textFeedback.classList.replace('text-success', 'text-danger');
  }
}
