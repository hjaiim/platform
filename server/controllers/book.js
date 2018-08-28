const Mock = require('mockjs');
const Books = require('../data/book');
let bookController = {};


bookController.find = (req, res) => {
  let page = parseInt(req.query.page || 1);
  let pageSize = parseInt(req.query.pageSize || 10);
  let name = req.query.name || '';
  let total = 0;
  let rltBooks = [];

  if (name.length > 0) {
    let mockBooks = Books.filter(book => {
      return book.name.indexof(name) > -1;
    })
    total = mockBooks.length;
    rltBooks = mockBooks.filter((u, index) => index < pageSize * page && index >= pageSize * (page - 1))
  } else {
    total = Books.length;
    rltBooks = Books.filter((u, index) => index < pageSize * page && index >= pageSize * (page - 1))
  }

  res.json({
    total: total,
    pageSize: pageSize,
    books: rltBooks
  })
}

bookController.add = (req, res) => {
  let resObg = {};
  let name = req.body.name;
  let author = req.body.author;
  let description = req.body.description;
  let publishAt = req.body.publishAt;

  if (name && author && description && publishAt) {
    Books.push({
      id: Mock.Random.guid(),
      name: name,
      author: author,
      description: description,
      publishAt: publishAt
    })
    resObg.code = 2000;
    resObg.msg = '创建成功';
  } else {
    resObg.code = 40002;
    resObg.msg = '缺少参数';
  }

  res.json(resObg);
}

module.exports = bookController;
