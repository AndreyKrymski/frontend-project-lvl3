import elements from './elementsDom.js';

export default function rendering(xml) {
  elements.feeds.innerHTML = '';
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
}
