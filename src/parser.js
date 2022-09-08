export default function parser(response, message) {
  const pars = new DOMParser();
  const xml = pars.parseFromString(response, 'application/xml');
  const parsererror = xml.querySelector('parsererror');
  if (parsererror) {
    throw new Error(message);
  }
  const items = xml.querySelectorAll('item');
  const posts = [];
  items.forEach((post) => {
    posts.push({
      link: post.querySelector('link').textContent,
      title: post.querySelector('title').textContent,
      description: post.querySelector('description').textContent,
      isVisited: false,
    });
  });
  const feed = {
    title: xml.querySelector('title').textContent,
    description: xml.querySelector('description').textContent,
  };
  return { feed, posts };
}
