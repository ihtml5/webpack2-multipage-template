class EventProxy {
    constructor() {
        this.events = {};
    }
    on(attr,callback) {
        console.error('callback',typeof callback);
        if (this.events[attr]) {
            this.events[attr].push(callback);
        } else {
            this.events[attr] = [callback];
        }
    }
    off(attr) {
        for (let key in this.events) {
            if(this.events.hasOwnProperty(key) && key === attr) {
                delete this.events[key];
            }
        }
    }
    emit(attr,...arg) {
        if (this.events[attr]) {
            this.events[attr].forEach(function(childFunc) {
                childFunc(...arg);
            });
        }
    }
}

export default EventProxy