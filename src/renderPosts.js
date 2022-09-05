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
  for (let i = state.data.posts.length - 1; i >= 0; i -= 1) {
    const liPosts = document.createElement('li');
    liPosts.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    liPosts.innerHTML = `
      <a href="${state.data.posts[i].link}" class="fw-bold" data-id="${state.data.posts[i].id}" target="_blank" rel="noopener noreferrer">${state.data.posts[i].title}</a>
      <button type="button" class="btn btn-outline-primary btn-sm" data-id="${state.data.posts[i].id}" data-bs-toggle="modal" data-bs-target="#modal">Просмотр</button>`;
    if (state.data.posts[i].isVisited) {
      liPosts.querySelector('a').classList.add('link-secondary', 'fw-normal');
      liPosts.querySelector('a').classList.remove('fw-bold');
    }
    ulPosts.prepend(liPosts);
  }
}
