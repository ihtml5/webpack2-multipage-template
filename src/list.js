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
        city: 'beijing'
    }
};

let app = new TObserver(data);

console.log(app.data);

// data = Object.assign({},data,{hobby:'love javascript'});
app.set('skill',['es6','node','react','vue'],false);
// app.set(data);
console.clear();
app.data['skill'] = ['cuc','node'];
root.innerHTML = app.data['user']['name'];
app.set('user',{name:'react'},true);
root.innerHTML = app.data['user']['name'];

let list = ['a','b'];
let fakeList = new DynamicArray(list);
fakeList.push('cc');

