import elements from './elementsDom';

export default function view(objectID) {
  elements.body.classList.add('modal-open');
  elements.body.setAttribute('style', 'overflow: hidden; padding-right: 17px;');
  elements.modal.setAttribute('style', 'display: block;');
  elements.modal.classList.add('show');
  const modalTitle = document.querySelector('.modal-title');
  const modalBody = document.querySelector('.modal-body');
  const buttonClose = document.querySelectorAll('[data-bs-dismiss="modal"]');
  const linkButton = document.querySelector('.full-article');
  modalTitle.textContent = objectID.text;
  modalBody.textContent = objectID.description;
  linkButton.setAttribute('href', objectID.link);
  buttonClose.forEach((it) => {
    it.addEventListener('click', () => {
      elements.body.classList.remove('modal-open');
      elements.body.removeAttribute('style');
      elements.modal.setAttribute('style', 'display: none;');
      elements.modal.classList.remove('show');
    });
  });
}
