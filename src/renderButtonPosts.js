import view from './view.js';
import elements from './elementsDom.js';

export default function renderButtonPosts(state) {
  const buttonPost = document.querySelectorAll('[data-bs-toggle="modal"]');
  buttonPost.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      view(state, e.target.dataset.id);
    });
  });
  const buttonClose = document.querySelectorAll('[data-bs-dismiss="modal"]');
  buttonClose.forEach((it) => {
    it.addEventListener('click', () => {
      elements.body.classList.remove('modal-open');
      elements.body.removeAttribute('style');
      elements.modal.setAttribute('style', 'display: none;');
      elements.modal.classList.remove('show');
    });
  });
}
