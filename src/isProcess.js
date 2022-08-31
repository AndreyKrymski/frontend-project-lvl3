import elements from './elementsDom.js';

export default function renderProccess(value) {
  if (value === 'processing') {
    elements.urlInput.setAttribute('readonly', 'true');
    elements.buttonRss.setAttribute('disabled', 'disabled');
  } else if (value === 'processingCompleted') {
    elements.urlInput.removeAttribute('readonly');
    elements.buttonRss.removeAttribute('disabled');
  }
}
