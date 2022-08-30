export default function parser(answer, message, state) {
  const pars = new DOMParser();
  const xml = pars.parseFromString(answer, 'application/xml');
  const parsererror = xml.querySelector('parsererror');
  if (parsererror) {
    throw new Error(message);
  } else {
    const item = xml.querySelectorAll('item');
    const arrayXml = [];
    let idNumber = state.id;
    item.forEach((it) => {
      idNumber += 1;
      arrayXml.push({
        id: idNumber,
        link: it.querySelector('link').textContent,
        text: it.querySelector('title').textContent,
        description: it.querySelector('description').textContent,
      });
    });
    const xmlObj = {
      fidsTitle: xml.querySelector('title').textContent,
      fidsDescription: xml.querySelector('description').textContent,
      posts: arrayXml,
    };
    return [xmlObj, idNumber];
  }
}
