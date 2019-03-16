
import axios from "axios";
import qs from 'qs'
// var baseURL="https://www.yunyikang.cn"//正式
var baseURL = "http://test99.yunyikang.cn"; //
// var baseURL="http://192.168.8.106/"//
axios.defaults.baseURL = baseURL;

axios.defaults.withCredentials = true;  // 跨域请求头
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // config.data = qs.stringify(config.data)    // 转换数据类型
    // console.log(config)     //    qs输出：data: "phone=18519708006&code=5332&pwd=123456"
    return config;
  }, function (error) {
    
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    
    // console.log(response)
    if (response.data.code == 406) {  // 如果未登录，返回登录页
        localStorage.clear();
        window.location.href = "/login";
      }
    return response;
  }, function (error) {
    // 对响应错误做点什么
    // console.log(error)
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          console.log('错误请求')
          break;
        case 401:
          console.log('未授权，请重新登录')
          break;
        case 403:
          console.log( '拒绝访问')
          break;
        case 404:
          console.log('请求错误,未找到该资源')
          break;
        case 405:
          console.log('请求方法未允许')
          break;
        case 408:
          console.log('请求超时')
          break;
        case 500:
          console.log('服务器端出错')
          break;
        case 501:
          console.log('网络未实现')
          break;
        case 502:
          console.log('网络错误')
          break;
        case 503:
          console.log('服务不可用')
          break;
        case 504:
          console.log('网络超时')
          break;
        case 505:
          console.log('http版本不支持该请求')
          break;
        default:
          console.log(`连接错误${error.response.status}`)
      }
    }
    return Promise.reject(error);
  });

// let config = {  // 使用 formData 的请求头
//     headers: {
//         'Content-Type': 'multipart/form-data'
//     }
//   }
  

function Axios (method, url, data) {
  return new Promise ((resolve, reject) => {
    axios({
      method: method,
      url: url,
      headers:{
      'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      data: data,
      transformRequest: [   //转换数据的方法
        function (data) {
        let ret = '';
        for (let it in data) {
          if (data.hasOwnProperty(it) === true) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
        }
        // console.log(ret)   //  格式：phone=18519708006&code=0211&pwd=123456&
        return ret;
      }],
    }).then((res)=>{
      resolve(res.data)
    }).catch(err => reject(err))
  })
}



  function $Post(url, data) {   // formData 请求
    var Http = axios.create({
        baseURL: baseURL,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
    return new Promise((resolve, reject) => {
        Http.post(url, data).then(res => {
          resolve(res.data)
        }).catch(err => reject(err))
    })
  }

  function $Put (url, data) {   // post请求
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(res => resolve(res.data)).catch(err => reject(err))
    })
  }

// 导出
export default {
  async upload (url, data, response, error) {
      return await $Post(url, data).then(res => response(res)).catch(err => error(err))
    },
   async post (url, data, response, error) {
        return await Axios('POST', url, data).then(res => response(res)).catch(err => error(err))
    },
    baseURL: baseURL,
    
}



