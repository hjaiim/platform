/**
 * Created by haojun on 2018/8/16.
 */

const Mock = require('mockjs');

const Books = [];
for (let i = 0; i < 100; i++) {
  Books.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.ctitle(2, 12),
    author: Mock.Random.cname(),
    description: Mock.Random.csentence(180, 500),
    publishAt: Mock.Random.date()
  }))
}
module.exports = Books;
