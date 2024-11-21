import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
});

instance.interceptors.request.use(config => {
  return config;
},
  error => {
    Promise.reject(error);
  }
);


instance.interceptors.response.use(response => {
  const result = response.data;
  if (result.code === 601 && response.config.url !== '/yw/wechat/bind_ehr') {
    showNotify({ type: 'warning', message: result.msg });
  }
  return result;
},
  error => {
    return Promise.rejuct(error);
  }
)
export default instance;
