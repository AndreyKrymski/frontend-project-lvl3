import elements from './elementsDom.js';

export default function parser(answer, watcheState) {
  const pars = new DOMParser();
  const xml = pars.parseFromString(answer, 'application/xml');
  const parsererror = xml.querySelector('parsererror');
  if (parsererror) {
    throw new Error('Ресурс не содержит валидный RSS');
  } else {
    watcheState.statusValidation = 'valid';
    console.log(xml);
    const title = xml.querySelector('title');
    const textTitle = title.textContent;
    const description = xml.querySelector('description');
    const textDescription = description.textContent;
    const div = document.createElement('div');
    div.classList.add('card', 'border-0');
    div.innerHTML = `
    <div class="card-body">
      <h2 class="card-title h4">Фиды</h2>
    </div>
    <ul class="list-group border-0 rounded-0">
      <li class="list-group-item border-0 border-end-0">
        <h3 class="h6 m-0">${textTitle}</h3>
          <p class="m-0 small text-black-50">${textDescription}</p>
      </li>
    </ul>`;
    elements.feeds.append(div);

    const item = xml.querySelectorAll('item');
    const ul = document.createElement('ul');
    ul.classList.add('list-group', 'border-0', 'rounded-0');
    let number = 0;
    item.forEach((it) => {
      number += 1;
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
      li.innerHTML = `
      <a href="${it.querySelector('link').textContent}" class="fw-bold" data-id="${number}" target="_blank" rel="noopener noreferrer">${it.querySelector('title').textContent}</a>
      <button type="button" class="btn btn-outline-primary btn-sm" data-id="${number}" data-bs-toggle="modal" data-bs-target="#modal">Просмотр</button>`;
      ul.append(li);
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
}
