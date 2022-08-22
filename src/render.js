import elements from './elementsDom.js';

export default function render(state, i18nextInstance) {
  console.log(state);

  if (state.statusValidation === 'valid') {
    elements.textFeedback.textContent = i18nextInstance.t('status.valid');
    elements.textFeedback.classList.add('text-success');
    elements.textFeedback.classList.remove('text-danger');
    elements.urlInput.classList.remove('is-invalid');
    elements.textBody.reset();
    elements.urlInput.focus();
  }
  if (state.statusValidation === 'invalid') {
    elements.textFeedback.textContent = state.erorr;
    elements.urlInput.classList.remove('text-success');
    elements.urlInput.classList.add('is-invalid');
    elements.textFeedback.classList.remove('text-success');
    elements.textFeedback.classList.add('text-danger');
  }
}
