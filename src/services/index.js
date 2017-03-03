import axios from 'axios';
import { isArray } from '../utils';
class TuService  {
    constructor() {
    }
    get(...rest) {
        let reqOpts = rest[0];
        let successCallback = rest[1];
        let errorCallback = rest[2];
        let extraParams = null;
        let { url,config} = typeof reqOpts === 'object' ? reqOpts : {};
        typeof errorCallback !== 'function' ? extraParams = errorCallback : extraParams =undefined;
        config ? config = config : config = undefined;
        axios.get(url,config).then((res) => {
            successCallback && successCallback(res.data,extraParams);
        }).catch(error => {
            errorCallback && typeof errorCallback === 'function' && errorCallback(error);
        });
    }
    post(...rest) {
        let params = rest[0];
        let func = rest[1];
        let errorFunc = rest[2];
        let extraParams = null;
        typeof errorFunc !== 'function' ? extraParams = errorFunc : extraParams =undefined;
        typeof params === 'function' ? func = params : func = func;
        this.config = Object.assign({},this.config,params && typeof params !=='function' ? {params}: {});
        axios.post(this.url,this.config).then((res) => {
            func && func(res.data,extraParams);
        }).catch(error => {
            errorFunc && typeof errorFunc === 'function' && errorFunc(error);
        });
    }
    all(requests) {
        if (isArray(requests)) {
            requests = requests;
        } else if (typeof requests ==='function') {
            requests = [requests]
        }
        axios.all(requests).then(axios.spread(function (...rest) {

        }));
    }
}

export default new TuService();