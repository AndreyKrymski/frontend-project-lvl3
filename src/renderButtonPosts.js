import view from './view.js';
import elements from './elementsDom.js';

export default function renderButtonPosts(state) {
  const buttonPost = document.querySelectorAll('[data-bs-toggle="modal"]');
  const href = document.querySelectorAll('.fw-bold');
  const buttonClose = document.querySelectorAll('[data-bs-dismiss="modal"]');
  buttonPost.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      view(state, e.target.dataset.id);
    });
  });
  href.forEach((it) => {
    it.addEventListener('click', (e) => {
      e.preventDefault();
      const [visitPostHref] = state.data.posts.filter((post) => post.id === e.target.dataset.id);
      visitPostHref.isVisited = true;
      e.target.classList.remove('fw-bold');
      e.target.classList.add('link-secondary', 'fw-normal');
      window.open(e.target.href);
    });
  });
  buttonClose.forEach((it) => {
    it.addEventListener('click', () => {
      elements.body.classList.remove('modal-open');
      elements.body.removeAttribute('style');
      elements.modal.setAttribute('style', 'display: none;');
      elements.modal.classList.remove('show');
    });
  });
}
