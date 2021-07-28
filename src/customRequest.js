import axios from "axios/index";
import cookie from 'react-cookies';
import ConfigCookie from './config/ConfigCookie'


axios.interceptors.request.use(cfg => {
    cfg.timeout = 10000;
    if(!cfg.params){
        cfg.params = {}
    }
    const accessToken = cookie.load(ConfigCookie.getTokenKey());
    if (accessToken) {
        // cfg.headers['Authorization'] = accessToken || '';
        cfg.headers['vieon-api-key'] = accessToken || '';
        return cfg;
    }
    return cfg

}, error => {
    return Promise.reject(error);
});
export default axios
