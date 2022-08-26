import elements from './elementsDom.js';

export default function rendering(xml) {
  elements.feeds.innerHTML = '';
  elements.posts.innerHTML = '';
  const div = document.createElement('div');
  div.classList.add('card', 'border-0');
  div.innerHTML = `
    <div class="card-body">
      <h2 class="card-title h4">Фиды</h2>
    </div>
    <ul class="list-group border-0 rounded-0">
      <li class="list-group-item border-0 border-end-0">
        <h3 class="h6 m-0">${xml.fidsTitle}</h3>
          <p class="m-0 small text-black-50">${xml.fidsDescription}</p>
      </li>
    </ul>`;
  elements.feeds.append(div);

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');
  let number = 0;
  xml.posts.links.forEach((it) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    li.innerHTML = `
      <a href="${it}" class="fw-bold" data-id="${number + 1}" target="_blank" rel="noopener noreferrer">${xml.posts.text[number]}</a>
      <button type="button" class="btn btn-outline-primary btn-sm" data-id="${number + 1}" data-bs-toggle="modal" data-bs-target="#modal">Просмотр</button>`;
    ul.append(li);
    number += 1;
  });
  const div2 = document.createElement('div');
  div2.classList.add('card', 'border-0');
  div2.innerHTML = `
    <div class="card-body">
      <h2 class="card-title h4">Посты</h2>
    </div>`;
  div2.append(ul);
  elements.posts.append(div2);
}
