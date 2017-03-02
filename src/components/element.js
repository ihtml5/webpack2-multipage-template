'use strict';

let createEl = function(tag,extraInfo) {
    tag = tag && typeof tag === 'string' ? tag : tag.toString();
    var el = document.createElement(tag);
    el.innerHTML = `Hello Webpack ${tag} ${extraInfo ? extraInfo.toString() : '' }`;
    return el;
}
export default createEl;