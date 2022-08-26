import axios from 'axios';
import parser from './parser.js';

export default function request(value, watcheState, state) {
  value.forEach((item) => {
    axios.get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(item)}`)
      .then((response) => response.data.contents)
      .then((answer) => parser(answer, watcheState))
      .catch((e) => {
        state.statusValidation = 'invalid';
        watcheState.erorr = e.message;
      });
  });
}
