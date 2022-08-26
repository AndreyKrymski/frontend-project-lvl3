export default function parser(answer) {
  const pars = new DOMParser();
  const xml = pars.parseFromString(answer, 'application/xml');
  const parsererror = xml.querySelector('parsererror');
  if (parsererror) {
    throw new Error('Ресурс не содержит валидный RSS');
  } else {
    const item = xml.querySelectorAll('item');
    const arrayLinks = [];
    const arrayText = [];
    item.forEach((it) => {
      arrayLinks.push(it.querySelector('link').textContent);
      arrayText.push(it.querySelector('title').textContent);
    });
    const xmlObj = {
      fidsTitle: xml.querySelector('title').textContent,
      fidsDescription: xml.querySelector('description').textContent,
      posts: {
        links: arrayLinks,
        text: arrayText,
      },
    };
    return xmlObj;
  }
}
