import _ from 'lodash';

export default function parser(response, message) {
  const pars = new DOMParser();
  const xml = pars.parseFromString(response, 'application/xml');
  const parsererror = xml.querySelector('parsererror');
  if (parsererror) {
    throw new Error(message);
  }
  const item = xml.querySelectorAll('item');
  const massivPosts = [];
  item.forEach((it) => {
    massivPosts.push({
      id: _.uniqueId(),
      link: it.querySelector('link').textContent,
      text: it.querySelector('title').textContent,
      description: it.querySelector('description').textContent,
    });
  });
  const objectPostandFeeds = {
    fidsTitle: xml.querySelector('title').textContent,
    fidsDescription: xml.querySelector('description').textContent,
    posts: massivPosts,
  };
  return objectPostandFeeds;
}
