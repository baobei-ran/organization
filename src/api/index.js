import axios from "axios";
// var baseURL="https://www.yunyikang.cn"//正式
var baseURL = "http://test99.yunyikang.cn/"; //
// var baseURL="http://192.168.8.106/"//
axios.defaults.withCredentials = true;
let http = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
  },
  transformRequest: [
    function(data) {    // 处理，转换成字符串
      let newData = "";
      for (let k in data) {
        if (data.hasOwnProperty(k) === true) {
          newData +=
            encodeURIComponent(k) + "=" + encodeURIComponent(data[k]) + "&";
        }
      }
      console.log(newData)
      return newData;
    }
  ]
});
http.interceptors.response.use(function(res) {
  //全局拦截处理未登录
  console.log(res)
  if (res.data.code == 406) {
    localStorage.clear();
    window.location.href = "/login";
  }
  return res;
});

function apiAxios(method, url, params, response, error) {
  http({
    method: method,
    url: url,
    data: method === "post" || method === "put" ? params : null,
    params: method === "GET" || method === "delelte" ? params : null
  })
    .then(function(res) {
      response(res.data);
    })
    .catch(function(err) {
      error(err);
    });
}
function $upload(Url, data, handle) {
  let instance = axios.create({
    baseURL: baseURL,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  instance
    .post(Url, data)
    .then(res => {
      handle(res.data);
    })
    .catch(error => {
      console.log(error);
    });
}



export default {
  get: function(url, params, response, err) {
    return apiAxios("GET", url, params, response, err);
  },
  post: function(url, params, response, err) {
    return apiAxios("post", url, params, response, err);
  },
  put: function(url, params, response, err) {
    return apiAxios("put", url, params, response, err);
  },
  delete: function(url, params, response, err) {
    return apiAxios("delete", url, params, response, err);
  },
  all: function(arr, response) {
    axios.all(arr).then(
      axios.spread(function(acct, perms) {
        return response();
      })
    );
  },
  upload: function(url, params, response) {
    return $upload(url, params, response);
  },
  baseURL: baseURL  // 导出前缀路径
};
