
var app = angular.module('bookmark', []);

app.constant('bookmarkManager', bookmarkManager);

app.controller('bookmarkCtrl', ['$scope','bookmarkManager', function($scope,bookmarkManager) {
    $scope.bookmarkLists = bookmarkManager.returnBookmarks();

    $scope.isNotEmpty = function(searchText){
        if (searchText.length!=0){
            return true;
        }
        else{
            return false;
        }
    }

    $scope.openLink = function(url){
       chrome.tabs.create({url: url});
    }
}]);


/*app.filter('filter', function($scope) {
    return function(x) {
        $scope.searchText
    };
});*/