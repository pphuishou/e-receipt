import request from '@/utils/request'

// 5.绑定档案
export function reqAddEhr(data) {
  return request({
    url: '/yw/wechat/bind_ehr',
    method: 'post',
    data
  })
}

// 3.查询当前微信号绑定的档案
export function reqWechatEhr(openid) {
  return request({
    url: '/yw/wechat/query_wechatehr',
    method: 'get',
    params: {
      openid
    }
  })
}

// 4.解除绑定
export function reqUnbindFile(params) {
  return request({
    url: '/yw/wechat/untie',
    method: 'get',
    params
  })
}

// 6.调用HIS获取电子票据列表
export function reqFileList(params) {
  return request({
    url: '/yw/wechat/call_his_get_list',
    method: 'get',
    params
  })
}

// 2.回调接口
export function reqOpenId(params) {
  return request({
    url: '/yw/wechat/invoke',
    method: 'get',
    params
  })
}
