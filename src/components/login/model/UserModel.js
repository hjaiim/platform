let _id = 0;
let _name = '';
let _email = '';
let _account = '';
let _nickName = '';

class UserModel {
  constructor() {}

  update($obj) {
    $obj['id'] && (_id = $obj['id']);
    $obj['name'] && (_name = $obj['name']);
    $obj['username'] && (_account = $obj['username']);
    $obj['email'] && (_email = $obj['email']);
    $obj['nickname'] && (_nickName = $obj['nickname']);
  }

  get id() {
    return _id;
  }
  get account() {
    return _account;
  }
  get name() {
    return _name;
  }
  get nickName() {
    return _nickName;
  }
  get email() {
    return _email;
  }
}

export default new UserModel();