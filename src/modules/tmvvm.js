class TObserver {
    constructor(data) {
        this.data = data;
        this.walk(data);
    }
    walk(obj) {
        let val = null;
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                val = obj[key];
                if (typeof val === 'object') {
                    new TObserver(val);
                }
                this.convert(key,val);
            }
        }
    }
    convert(key,val) {
        Object.defineProperty(this.data,key,{
            enumerable: true,
            configurable: true,
            get: function() {
                console.log(`你访问了${key}`);
                return val;
            },
            set: function(newVal) {
                console.log('你设置了'+key);
                console.log(`新的${key}=${newVal}`);
                if (newVal === val) return;
                val = newVal;
            }
        })
    }
    set(...rest) {
        if (rest.length === 0 ) {
            return;
        }
        let newData = this.data;
        const key = rest[0];
        const value = rest[1];
        const combination = rest[2];
        if (key && typeof key === 'object') {
            this.data = key;
            this.walk(this.data);
        } else if (key && typeof key === 'string' && value && !combination ) {
            newData[key] = value;
            this.data = newData;
            this.walk(this.data);
        } else if (key && typeof key === 'string' && value && combination) {
            if (typeof newData[key] === 'object' && newData[key]) {
                if (Object.prototype.toString.call(newData[key]) === '[object Object]') {
                    newData[key] = Object.assign({},this.data[key],value);
                } else if (Object.prototype.toString.call(newData[key]) === '[object Array]') {
                    newData[key] = Array.from(new Set(this.data[key].concat(value)));
                }
            }
            this.data=newData;
            this.walk(this.data);
        }
    }
}

class DynamicArray {
    constructor() {
        Array.call(this,arguments);
    }
    push() {
        console.clear();
        console.log('push,我被改变了');
        return Array.prototype.push(this,arguments);
    }
}
export default TObserver;

export {
    DynamicArray
}