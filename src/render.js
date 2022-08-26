import elements from './elementsDom.js';

export default function render(state, i18nextInstance) {
  console.log(state);

  if (state.statusValidation === 'valid') {
    elements.textFeedback.textContent = i18nextInstance.t('status.valid');
    elements.textFeedback.classList.replace('text-danger', 'text-success');
    elements.urlInput.classList.remove('is-invalid');
    elements.urlInput.removeAttribute('readonly');
    elements.buttonRss.removeAttribute('disabled');
    elements.textBody.reset();
    elements.urlInput.focus();
  } else if (state.statusValidation === 'invalid') {
    elements.textFeedback.textContent = state.erorr;
    elements.urlInput.classList.add('is-invalid');
    elements.textFeedback.classList.replace('text-success', 'text-danger');
    elements.urlInput.removeAttribute('readonly');
    elements.buttonRss.removeAttribute('disabled');
  } else if (state.statusValidation === 'processing') {
    elements.urlInput.setAttribute('readonly', 'true');
    elements.buttonRss.setAttribute('disabled', 'disabled');
  }
}
