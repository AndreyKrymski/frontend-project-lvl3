import elements from './elementsDom.js';

export default function renderProccess(isProcess) {
  if (isProcess) {
    elements.urlInput.setAttribute('readonly', 'true');
    elements.buttonRss.setAttribute('disabled', 'disabled');
    elements.urlInput.classList.remove('is-invalid');
    elements.textFeedback.textContent = '';
  } else {
    elements.urlInput.removeAttribute('readonly');
    elements.buttonRss.removeAttribute('disabled');
  }
}
