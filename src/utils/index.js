let isArray = Array.isArray || function(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}
let console = {
    log: () => {}
}
export {
    isArray,
    console
}