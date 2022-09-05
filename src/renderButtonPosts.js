import view from './view.js';
import elements from './elementsDom.js';

export default function renderButtonPosts(state) {
  const buttonPost = document.querySelectorAll('[data-bs-toggle="modal"]');
  buttonPost.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const [visitPost] = state.data.posts.filter((post) => post.id === e.target.dataset.id);
      visitPost.isVisited = true;
      view(state, e.target.dataset.id);
    });
  });
  const href = document.querySelectorAll('.fw-bold');
  href.forEach((it) => {
    it.addEventListener('click', (e) => {
      e.preventDefault();
      const [visitPost] = state.data.posts.filter((post) => post.id === e.target.dataset.id);
      visitPost.isVisited = true;
      e.target.classList.remove('fw-bold');
      e.target.classList.add('link-secondary', 'fw-normal');
      window.open(e.target.href);
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
