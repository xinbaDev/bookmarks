

bookmarkModel = (function(){
  'use strict';
  

  var BookList = function(){
    this.bookObjList = [];
    var importance_mark = "***"

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

    this.editBookmarks = function(id,newTitle){
      _this.bookObjList.forEach(function(d,i){
        if(d.id == id){
          _this.bookObjList[i].title = newTitle;
        }
      });
    }

    this.numOfBooks = function(){
      return this.bookObjList.length;
    }

    this._recurGetChildren = function(bookMark){
        //console.log(bookMark);
        if (bookMark.hasOwnProperty("url")){
            var importance = _this._getImportance(bookMark.title);
            if(importance) {
              bookMark.title = bookMark.title.slice(0,-importance_mark.length);
            }
            bookMark.favicon = "chrome://favicon/" + bookMark.url;
            var book = new Book(bookMark.id, bookMark.url, bookMark.favicon, bookMark.title, new Date(bookMark.dateAdded), importance);
            _this.bookObjList.push(book);
        }

        if (bookMark.hasOwnProperty("children")){
            bookMark.children.forEach(function(book){
              _this._recurGetChildren(book);
            })
        }
    }

    this._getImportance = function(title){
      var mark = title.slice(title.length-importance_mark.length, title.length);
      if(mark == "***"){
        return true;
      }else{
        return false;
      }
    }

  }

  var Book = function(id, url, favicon, title, dateAdded, isImportant){
    this.id           = id;
    this.url          = url;
    this.favicon      = favicon;
    this.title        = title;
    this.dateAdded    = dateAdded;
    this.isImportant  = isImportant;

    this.getID = function(){
      return this.id;
    }

    this.getFavIcon = function(){
      return this.favicon;
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