import axios from "axios/index";
import cookie from 'react-cookies';
import ConfigCookie from './config/ConfigCookie'


axios.interceptors.request.use(cfg => {
    cfg.timeout = 10000;
    if(!cfg.params){
        cfg.params = {}
    }
    const vieOnApiKey = cookie.load(ConfigCookie.getApiKey());
    if (vieOnApiKey) {
        // cfg.headers['Authorization'] = vieOnApiKey || '';
        cfg.headers['vieon-api-key'] = vieOnApiKey || '';
        return cfg;
    }
    return cfg

}, error => {
    return Promise.reject(error);
});
export default axios
