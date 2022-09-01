//import axios from 'axios';
//import parser from './parser';
//import _ from 'lodash';

//export default function startTimer(state) {
//  const timer = () => {
//    state.url.forEach((item) => {
//      axios.get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(item)}`)
//      .then((response) => {
//        const objectPostandFeeds = parser(response.data.contents);
//        console.log(objectPostandFeeds.posts);
//        const sravn = _.differenceWith(objectPostandFeeds.posts, [values], [comparator])
//        console.log(sravn);
//      })
//    });
//    setTimeout(() => timer(), 30000);
//  }
//  timer();
//}