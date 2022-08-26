import axios from 'axios';
import parser from './parser.js';
import rendering from './rendering.js';

export default function request(value, watcheState, state) {
  value.forEach((item) => {
    axios.get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(item)}`)
      .then((response) => response.data.contents)
      .then((answer) => {
        const xml = parser(answer);
        watcheState.statusValidation = 'valid';
        rendering(xml);
      })
      .catch((e) => {
        state.statusValidation = 'invalid';
        watcheState.erorr = e.message;
      });
  });
}
