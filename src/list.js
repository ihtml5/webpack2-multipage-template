'use strict';
// import createEl from './components/element.js';
// let firstScript = document.getElementsByTagName('script')[0]
// firstScript.parentNode.insertBefore(createEl('div','list'),firstScript);
var root = document.getElementById('tmvvm');
import TObserver,{ DynamicArray} from './modules/tmvvm.js';
import apiSeverice from './services';
const data = {
    user: {
        name: 'tmvvm',
        age: 24
    },
    address: {
        city: 'luoyang'
    }
};

let app = new TObserver(data);
let services = apiSeverice.get({url: 'http://ac-OnsG2j7w.clouddn.com/61489181fc856ffd.json'});

// console.log('app',app);
// app.$watch('user',function(user) {
//     console.log('改变',user['user']);
// });
// app.set('user','chenyf');




