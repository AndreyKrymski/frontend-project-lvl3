import elements from './elementsDom';

export default function view(state, id) {
  const [post] = state.data.posts.filter((item) => item.id === id);
  const buttonPost = document.querySelector(`[data-id="${id}"]`);
  buttonPost.classList.remove('fw-bold');
  buttonPost.classList.add('link-secondary', 'fw-normal');
  elements.body.classList.add('modal-open');
  elements.body.setAttribute('style', 'overflow: hidden; padding-right: 17px;');
  elements.modal.setAttribute('style', 'display: block;');
  elements.modal.classList.add('show');
  const modalTitle = document.querySelector('.modal-title');
  const modalBody = document.querySelector('.modal-body');
  const linkButton = document.querySelector('.full-article');
  modalTitle.textContent = post.title;
  modalBody.textContent = post.description;
  linkButton.setAttribute('href', post.link);
}
