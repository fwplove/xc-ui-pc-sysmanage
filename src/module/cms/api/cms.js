
//public是对axios的工具类封装，定义了http请求方法
import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;
export const page_list = (page,size,params) => {
  //json=> key/value
  let query = querystring.stringify(params);
  return http.requestQuickGet(apiUrl+'/cms/page/list/'+page+'/'+size+'/?'+query)
}

/*页面添加*/
export const page_add = params => {
  return http.requestPost(apiUrl + '/cms/page/add', params)
}

/*页面修改 */
export const page_edit=params=>{
  return http.requestPut(apiUrl+'/cms/page/edit',params)
}

/*页面查询 */
export const page_get=params=>{
  return http.requestPut(apiUrl+'/cms/page/edit',params)
}