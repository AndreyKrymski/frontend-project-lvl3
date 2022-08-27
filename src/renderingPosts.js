import elements from './elementsDom.js';

export default function rendering(xml, message) {
  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');
  xml.posts.forEach((it) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    li.innerHTML = `
      <a href="${it.link}" class="fw-bold" data-id="${it.id}" target="_blank" rel="noopener noreferrer">${it.text}</a>
      <button type="button" class="btn btn-outline-primary btn-sm" data-id="${it.id}" data-bs-toggle="modal" data-bs-target="#modal">Просмотр</button>`;
    ul.append(li);
  });
  const div2 = document.createElement('div');
  div2.classList.add('card', 'border-0');
  div2.innerHTML = `
    <div class="card-body">
      <h2 class="card-title h4">${message}</h2>
    </div>`;
  div2.append(ul);
  elements.posts.append(div2);
}
