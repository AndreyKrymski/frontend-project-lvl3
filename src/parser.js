import _ from 'lodash';

export default function parser(response, message) {
  const pars = new DOMParser();
  const xml = pars.parseFromString(response, 'application/xml');
  const parsererror = xml.querySelector('parsererror');
  if (parsererror) {
    throw new Error(message);
  }
  const items = xml.querySelectorAll('item');
  const posts = [];
  const feedId = _.uniqueId();
  items.forEach((post) => {
    posts.push({
      link: post.querySelector('link').textContent,
      title: post.querySelector('title').textContent,
      description: post.querySelector('description').textContent,
      isVisited: false,
      feedId,
    });
  });
  const feed = {
    title: xml.querySelector('title').textContent,
    description: xml.querySelector('description').textContent,
    feedId,
  };
  return { feed, posts };
}
