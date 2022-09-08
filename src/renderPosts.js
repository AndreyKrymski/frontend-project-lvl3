import elements from './elementsDom.js';

export default function renderPosts(state, i18nextInstance) {
  elements.posts.innerHTML = '';
  const divPosts = document.createElement('div');
  divPosts.classList.add('card', 'border-0');
  divPosts.innerHTML = `
    <div class="card-body">
      <h2 class="card-title h4">${i18nextInstance.t('text.posts')}</h2>
    </div>
    <ul class="list-group border-0 rounded-0"></ul>`;
  elements.posts.prepend(divPosts);
  const ulPosts = elements.posts.querySelector('ul');
  state.data.posts.forEach((post) => {
    const liPosts = document.createElement('li');
    liPosts.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    liPosts.innerHTML = `
      <a href="${post.link}" class="fw-bold" data-id="${post.id}" target="_blank" rel="noopener noreferrer">${post.title}</a>
      <button type="button" class="btn btn-outline-primary btn-sm" data-id="${post.id}" data-bs-toggle="modal" data-bs-target="#modal">${i18nextInstance.t('text.buttons')}</button>`;
    if (post.isVisited) {
      const aPosts = liPosts.querySelector('a');
      aPosts.classList.add('link-secondary', 'fw-normal');
      aPosts.classList.remove('fw-bold');
    }
    ulPosts.append(liPosts);
  });
}
