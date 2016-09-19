
var bookmarkManager = new bookmarkModel.bookmark();


var app = angular.module('bookmark', ['ngDialog']);


app.constant('bookmarkManager', bookmarkManager);

app.controller('bookmarkCtrl', ['$scope', 'bookmarkManager','ngDialog', function($scope,bookmarkManager,ngDialog) {
    
    $scope.sortType      = 'dateAdded';
    $scope.bookmarkLists = [];
    $scope.titleChecked  = true;
    $scope.sortReverse   = true;
    $scope.status        = [];

    if(bookmarkManager.numOfBooks() == 0){
        chrome.bookmarks.getTree(getBookmarksCallback);
    }
    

    function getBookmarksCallback(booklist){
        bookmarkManager.getBookmarks(booklist);
        $scope.$apply(function(){
            $scope.bookmarkLists = bookmarkManager.returnBookmarks();
        });
    }

    var DateRangeSetUp = function(){
        var start = moment().subtract(7, 'days');
        var end = moment();
        this.scope = $scope;
        that = this;


        function cb(start, end) {

            $('#reportrange span').html(start.format('D MMMM , YYYY') + ' - ' + end.format('D MMMM , YYYY'));
            scope = angular.element($('#reportrange')).scope();

            scope.$apply(function(){
                scope.startDate = start;
                scope.endDate = end;
                scope.isSearchByDate = true;
            });
        }

        this.setScope = function(scope){
            that.scope = scope;
        };

        $('#reportrange').daterangepicker({
            startDate: start,
            endDate: end,
            ranges: {
               'Today': [moment(), moment()],
               'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
               'Last 7 Days': [moment().subtract(6, 'days'), moment()],
               'Last 30 Days': [moment().subtract(29, 'days'), moment()],
               'Last 365 Days': [moment().subtract(1, 'years'), moment()],
               '3 Years Ago': [moment().subtract(100, 'years'), moment().subtract(3, 'years')]
            },
            parentEl:'.input-group'
        }, cb);
    }

    dataRange = new DateRangeSetUp();


    $scope.isNotEmpty = function(searchText){
        if(searchText.length != 0){
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
            return "Search in your " + num + " bookmarks";
        }



    }

    $scope.changeImportance = function(book){

        var id = book.getID();

        if(book.isImportant){
            chrome.bookmarks.update(id,{"title":book.title});
        }else{
            chrome.bookmarks.update(id,{"title":book.title + "[__IMPORTANT__]"});
        }

        book.isImportant=!book.isImportant;
    }


    $scope.titleClick = function(){
        $scope.titleChecked = true;
        $scope.urlChecked = false;
        $scope.timeChecked = false;
        $scope.isOpen = false;
        $scope.filterField = "title";
        $scope.isSearchByDate = false;
    }

    $scope.urlClick = function(){
        $scope.titleChecked = false;
        $scope.urlChecked = true;
        $scope.timeChecked = false;
        $scope.isOpen = false;
        $scope.filterField = "url";
        $scope.isSearchByDate = true;
        $scope.isSearchByDate = false;
    }

    $scope.timeClick = function(){
        $scope.titleChecked = false;
        $scope.urlChecked = false;
        $scope.timeChecked = true;
        $scope.isOpen = false;
        $scope.filterField = "time";
        $scope.searchText = "";


    }

    $scope.bySearchText = function(searchText) {

        if($scope.titleChecked){
            return function(bookmark) {
                return !(bookmark.title.toLowerCase().indexOf(searchText) == -1);
            }
        }else if($scope.urlChecked){
            return function(bookmark) {
                return !(bookmark.url.toLowerCase().indexOf(searchText) == -1);
            }
        }else{
            return function(bookmark) {
                return bookmark.dataAdded == searchText;
            }
        }

    }

    $scope.bySearchDate = function() {

        return function(bookmark) {
                return (($scope.startDate < bookmark.dateAdded) && (bookmark.dateAdded <= $scope.endDate));
        }
    }


}]);


app.directive('clearBtn', ['$parse', function ($parse) {
    return {
        link: function (scope, elm, attr, ngModelCtrl) {
            console.log(elm);

            elm.wrap("<div style='position: relative'></div>");
            var btn = '<i class="searchclear ng-hide fa fa-close"></i>';
            var angularBtn = angular.element(btn);
            angularBtn.css('top', 10);
            elm.after(angularBtn);
            //clear the input
            angularBtn.on("click", function () {
                scope.searchText = "";
                scope.focusOnText();
                angularBtn.addClass("ng-hide");
                scope.$apply();
            });

            // show  clear btn  on focus
            elm.bind('focus keyup change paste propertychange', function (blurEvent) {
                if (elm.val() && elm.val().length > 0) {
                    angularBtn.removeClass("ng-hide");

                } else {
                    angularBtn.addClass("ng-hide");
                }
            });

        }
    };
}]);