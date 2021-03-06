/**
 * Created by haojun on 2018/6/1.
 * 作为项目,临时需要的工具类库.最后同步到npm发包上
 */

export default {
  setSessionData: (k, v)=>
  {
    sessionStorage.setItem(k, JSON.stringify(v));
  },
  getSessionData: (k)=>
  {
    let v = sessionStorage.getItem(k);
    if (v == null || v == undefined || v == "null" || v == "undefined")
    {
      v = "";
      return v;
    }
    return JSON.parse(v);
  }
}
