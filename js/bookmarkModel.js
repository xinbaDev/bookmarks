/*
 * bookmark.model.js
 * Model module
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/

bookmarkModel = (function(){
  'use strict';
  
  var BookList = function(){
    
    this.bookObjList = [];
    var _this = this;

    this.recurGetChildren = function(bookMark){
        if (bookMark.hasOwnProperty("url")){

            var book = new Book(bookMark.url,bookMark.title,new Date(bookMark.dateAdded));
            _this.bookObjList.push(book);
        }

        if (bookMark.hasOwnProperty("children")){
            bookMark.children.forEach(function(book){
              _this.recurGetChildren(book);
            })
        }
    }

    this.getBookmarks = function(booklists){
      //console.log(booklists[0]);
      _this.recurGetChildren(booklists[0]);
      console.log(_this.bookObjList);
    }

    this.returnBookmarks = function(){
      return this.bookObjList;
    }

  }

  var Book = function(url,title,dateAdded){

    this.url          = url;
    this.title        = title;
    this.dateAdded    = dateAdded;

    this.getDate = function(){
      var day   = this.dateAdded.getDate();
      var month = this.dateAdded.getMonth() + 1;
      var year  = this.dateAdded.getFullYear();

      return day+"/"+month+"/"+year
    }

    this.getTitle = function(){
      if (this.title.length > 40)
        return this.title.substr(0, 40) + "...";
      return this.title;
    }
  }

  return {
    bookmark : BookList,
  };
})();