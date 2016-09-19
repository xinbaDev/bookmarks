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

    this.getBookmarks = function(booklists){
      _this._recurGetChildren(booklists[0]);
    }

    this.returnBookmarks = function(){
      return this.bookObjList;
    }

    this.deleteBookmarks = function(id){
      _this.bookObjList.forEach(function(d,i){
        if(d.id == id){
          _this.bookObjList.splice(i,1);
        }
      });
    }

    this.numOfBooks = function(){
      return this.bookObjList.length;
    }

    this._recurGetChildren = function(bookMark){
        if (bookMark.hasOwnProperty("url")){
            var importance = _this._getImportance(bookMark.title);
            if(importance) bookMark.title = bookMark.title.slice(0,-15);
            
            var book = new Book(bookMark.id, bookMark.url, bookMark.title, new Date(bookMark.dateAdded), importance);
            _this.bookObjList.push(book);
        }

        if (bookMark.hasOwnProperty("children")){
            bookMark.children.forEach(function(book){
              _this._recurGetChildren(book);
            })
        }
    }

    this._getImportance = function(title){
      var mark = title.slice(title.length-15, title.length);
      if(mark == "[__IMPORTANT__]"){
        return true;
      }else{
        return false;
      }
    }

  }

  var Book = function(id, url, title, dateAdded, isImportant){
    this.id           = id;
    this.url          = url;
    this.title        = title;
    this.dateAdded    = dateAdded;
    this.isImportant  = isImportant;

    this.getID = function(){
      return this.id;
    }

    this.getDate = function(){
      var day   = this.dateAdded.getDate();
      var month = this.dateAdded.getMonth() + 1;
      var year  = this.dateAdded.getFullYear();

      return day+"/"+month+"/"+year
    }

    this.getTitle = function(){
      if (this.title.length > 50)
        return this.title.substr(0, 50) + "...";
      return this.title;
    }
  }

  return {
    bookmark : BookList,
  };
})();