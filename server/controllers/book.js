const Mock = require('mockjs');
const Books = require('../data/book');
var bookController = {};

bookController.find = (req,res)=>{
    let page = parseInt(req.query.page || 1);
    let pageSize = parseInt(req.query.pageSize || 10);
    let name = req.query.name ||'';
    let total = 0;
    let rltBooks = [];

    if (name.length > 0) {
        let mockBooks = Books.filter(book =>{
            return book.name.indexof(name) > -1;
        })
        total = mockBooks.length;
        rltBooks = mockBooks.filter((u,index) => index < pageSize * page && index >= pageSize * (page - 1))
    } else {
        total = Books.length;
        rltBooks = Books.filter((u,index) => index < pageSize * page && index >= pageSize * (page - 1))
    }

    res.json({
        total:total,
        pageSize:pageSize,
        books:rltBooks
    })
};

module.exports = bookController;