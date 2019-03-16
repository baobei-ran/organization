
import axios from "axios";
import qs from 'qs'
// var baseURL="https://www.yunyikang.cn"//正式
var baseURL = "http://test99.yunyikang.cn/"; //
// var baseURL="http://192.168.8.106/"//
axios.defaults.baseURL = baseURL;

axios.defaults.withCredentials = true;  // 跨域请求头
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    config.data = qs.stringify(config.data)
    // console.log(config)
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
    console.log(error)
    return Promise.reject(error);
  });

// let config = {
//     headers: {
//         'Content-Type': 'multipart/form-data'
//     },
//      // 当需要发送formData格式的时候如下
//      transformRequest: [
//       function(data) {  //转换数据的方法
//         let newData = "";
//         for (let k in data) {
//           if (data.hasOwnProperty(k) === true) {
//             newData += encodeURIComponent(k) + "=" + encodeURIComponent(data[k]) + "&";
//           }
//         }
//         // console.log(newData)
//         return newData;
//       }
//     ]
//   }
  



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
        return await Axios(url, data).then(res => response(res)).catch(err => error(err))
    },
    baseURL: baseURL,
    
}


function Axios (url, data) {
  return new Promise ((resolve, reject) => {
    axios({
      method:"post",
      url: url,
      headers:{
      'Content-type': 'application/x-www-form-urlencoded'
      },
      data: data,
      transformRequest: [
        function (data) {
        let ret = '';
        for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret;
      }],
    }).then((res)=>{
      resolve(res.data)
    }).catch(err => reject(err))
  })
}
