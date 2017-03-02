'use strict';
// import createEl from './components/element.js';
// let firstScript = document.getElementsByTagName('script')[0]
// firstScript.parentNode.insertBefore(createEl('div','list'),firstScript);
var root = document.getElementById('tmvvm');
import TObserver,{ DynamicArray} from './modules/tmvvm.js';
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
console.log('app',app);
app.$watch('user',function(user) {
    console.log('改变',user);
});
app.set('user','chenyf');



