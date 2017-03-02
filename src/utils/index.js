let isArray = Array.isArray || function(arr) {
    return Object.prototype.toString.call(arr);
}

export {
    isArray
}