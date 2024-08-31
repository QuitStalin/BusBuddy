import axios from 'axios';

// Request interceptor
axios.interceptors.request.use((request) => {
  console.log('Starting Request', request);
  return request;
});

// Response interceptor
axios.interceptors.response.use((response) => {
  console.log('Response:', response);
  return response;
}, (error) => {
  console.error('Response Error:', error);
  return Promise.reject(error);
});

export default axios;
