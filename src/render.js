import elements from './elementsDom.js';

export default function render(value, message) {
  if (value === 'valid') {
    elements.textFeedback.textContent = message;
    elements.textFeedback.classList.replace('text-danger', 'text-success');
    elements.urlInput.classList.remove('is-invalid');
    elements.textBody.reset();
    elements.urlInput.focus();
  } else {
    elements.textFeedback.textContent = value;
    elements.urlInput.classList.add('is-invalid');
    elements.textFeedback.classList.replace('text-success', 'text-danger');
  }
}
