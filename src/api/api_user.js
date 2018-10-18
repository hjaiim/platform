import * as API from './'
export default {
  search: params => API.POST('user/search', params),
  upload: params => API.POST('user/base', params),
  send: params => API.POST('user/upload', params)
}
