import elements from './elementsDom';

export default function view(state, id) {
  const [objectID] = state.rssFiles.flatMap((it) => it.posts).filter((iter) => iter.id === id);
  elements.body.classList.add('modal-open');
  elements.body.setAttribute('style', 'overflow: hidden; padding-right: 17px;');
  elements.modal.setAttribute('style', 'display: block;');
  elements.modal.classList.add('show');
  const modalTitle = document.querySelector('.modal-title');
  const modalBody = document.querySelector('.modal-body');
  const linkButton = document.querySelector('.full-article');
  modalTitle.textContent = objectID.text;
  modalBody.textContent = objectID.description;
  linkButton.setAttribute('href', objectID.link);
}
