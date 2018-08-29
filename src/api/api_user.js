import * as API from './'
export default {
  search: params => API.POST('user/search', params)
}
