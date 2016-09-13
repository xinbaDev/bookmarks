
var bookmarkManager = new bookmarkModel.bookmark();


var app = angular.module('bookmark', ['ngDialog']);

app.constant('bookmarkManager', bookmarkManager);

app.controller('bookmarkCtrl', ['$scope', 'bookmarkManager', 'ngDialog', function($scope,bookmarkManager,ngDialog) {
    
    $scope.sortType      = 'dateAdded';
    $scope.sortReverse   = true;
    $scope.bookmarkLists = [];
    $scope.titleChecked = true;

    if(bookmarkManager.numOfBooks()==0){
        chrome.bookmarks.getTree(getBookmarksCallback);
    }
    

    function getBookmarksCallback(booklist){
        bookmarkManager.getBookmarks(booklist);
        $scope.$apply(function(){
            $scope.bookmarkLists = bookmarkManager.returnBookmarks();
        });
    }

    $scope.isNotEmpty = function(searchText){
        if (searchText.length!=0){
            return true;
        }else{
            return false;
        }
    }

    $scope.openLink = function(url){
       chrome.tabs.create({url: url});
    }

    $scope.focusOnText = function(){
        $('#search').focus();
    }

    $scope.deleteBookmarks = function(id){

        var paddingTop = $('body').height()/2;

        ngDialog.openConfirm({template: 'confirm.html', paddingTop: paddingTop}).then(       
            function(value) {
                bookmarkManager.deleteBookmarks(id);
                chrome.bookmarks.remove(id);
                ngDialog.close();
            },
            function(value) {
                ngDialog.close();
            });
    }

    $scope.getNumberOfBookMarks = function(){
        var num = bookmarkManager.numOfBooks();
        if(num <= 1){
            return "Search in your bookmarks";
        }else{
            return "Search in your "+ num + " bookmarks";
        }
    }

    $scope.changeImportance = function(book){

        var id = book.getID();

        if(book.isImportant){
            chrome.bookmarks.update(id,{"title":book.title});
        }else{
            chrome.bookmarks.update(id,{"title":book.title+"[__IMPORTANT__]"});
        }

        book.isImportant=!book.isImportant;
    }


    $scope.titleClick = function(){
        $scope.titleChecked = true;
        $scope.urlChecked = false;
        $scope.timeChecked = false;
        $scope.isOpen = false;
        $scope.filterField = "title";
    }

    $scope.urlClick = function(){
        $scope.titleChecked = false;
        $scope.urlChecked = true;
        $scope.timeChecked = false;
        $scope.isOpen = false;
        $scope.filterField = "url";
    }

    $scope.timeClick = function(){
        $scope.titleChecked = false;
        $scope.urlChecked = false;
        $scope.timeChecked = true;
        $scope.isOpen = false;
        $scope.filterField = "time";
    }


    $scope.bySearchText = function(searchText) {

        if($scope.titleChecked){
            return function(bookmark) {
                return !(bookmark.title.toLowerCase().indexOf(searchText)==-1);
            }
        }else if($scope.urlChecked){
            return function(bookmark) {
                return !(bookmark.url.toLowerCase().indexOf(searchText)==-1);
            }
        }else{
            return function(bookmark) {
                return bookmark.dataAdded == searchText;
            }
        }

}


/*    $scope.mouseEnter = function(id){
        $('#moreControlOpt_'+id).css("color", "lightblue");

    }

    $scope.mouseLeave = function(id){
        $('#moreControlOpt_'+id).css("color", "");

    }
*/



}]);

