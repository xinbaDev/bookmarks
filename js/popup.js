// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/*Books = function(){
  _this = this;
  _this.data = [];

  this.getBooks = function(booklists){
    var obj;
    booklists.forEach(function(d,_this){
      obj = d;
    })
    _this.data = obj;

    console.log(_this.returnBooks());
  }

  this.returnBooks = function(){
    return this.data;
  }
}
*/
(function(){

BookList = function(){
  
  this.bookObjList = [];
  _this = this;

  this.recurGetChildren = function(bookMark){
      if (bookMark.hasOwnProperty("url")){
          var book = new Book(bookMark.url,bookMark.title,bookMark.dateAdded);
          _this.bookObjList.push(book);
      }

      if (bookMark.hasOwnProperty("children")){
          bookMark.children.forEach(function(book){
            _this.recurGetChildren(book);
          })
      }
  }

  this.getBooks = function(booklists){
    console.log(booklists[0]);
    _this.recurGetChildren(booklists[0]);
    console.log(_this.bookObjList);
  }


}

Book = function(url,title,dataAdded){

  this.url          = url;
  this.title        = title;
  this.dataAdded    = dataAdded;
}

var bookList = new BookList();

//get all the bookmarks
chrome.bookmarks.getTree(bookList.getBooks);




// Search the bookmarks when entering the search keyword.
$(function() {
     addEventListener('keyup',function(event){
        searchBookmarks($('#search').val());
     });
});

document.addEventListener('DOMContentLoaded', function () {
  $('#search').focus() ;
});

})();

