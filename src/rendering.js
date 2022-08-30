import elements from './elementsDom.js';

export default function rendering(xml) {
  const ul = elements.posts.querySelector('ul');
  xml.posts.forEach((it) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    li.innerHTML = `
      <a href="${it.link}" class="fw-bold" data-id="${it.id}" target="_blank" rel="noopener noreferrer">${it.text}</a>
      <button type="button" class="btn btn-outline-primary btn-sm" data-id="${it.id}" data-bs-toggle="modal" data-bs-target="#modal">Просмотр</button>`;
    ul.prepend(li);
  });
  const li = document.createElement('li');
  const ul2 = elements.feeds.querySelector('ul');
  li.classList.add('list-group-item', 'border-0', 'border-end-0');
  li.innerHTML = `
  <h3 class="h6 m-0">${xml.fidsTitle}</h3>
    <p class="m-0 small text-black-50">${xml.fidsDescription}</p>
  </li>`;
  ul2.prepend(li);
}
