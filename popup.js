// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.



// Traverse the bookmark tree, and print the folder and nodes.
function dumpBookmarks(query) {
  //var string = new String(query);
/*  var bookmarkTreeNodes = chrome.bookmarks.getTree(
    function(bookmarkTreeNodes) {*/
      //$('#bookmarks').append(dumpTreeNodes(bookmarkTreeNodes, query));
      $('#bookmarks').empty()
      var bookmarks = chrome.bookmarks.search(String(query),function(bookmarkNodes){
          var list = $('<div>');
          var i;
          list.append('<p>');
          for (i = 0; i < bookmarkNodes.length; i++) {
             var bookmarkNode = bookmarkNodes[i];
             
             if(!isDir(bookmarkNode)){
                var anchor = $('<a>');
                anchor.attr('href', bookmarkNode.url);
                anchor.text(String(i+1) + ". " + bookmarkNode.title);

                anchor.click(function() {
                  chrome.tabs.create({url: bookmarkNode.url});
                });

                anchor.append('<p>');

                list.append(anchor);
              } 
          }
          $('#bookmarks').append(list);

          //resize popup.html
          var hegiht = $('#bookmarks').height() + 30;
          $('html').height(hegiht);  
          $('body').height(hegiht);  
      })
}


function isDir(bookmarkNode){
  if(bookmarkNode.hasOwnProperty("dateGroupModified"))
    return true
  return false;
}

// Search the bookmarks when entering the search keyword.
$(function() {
     addEventListener('keyup',function(event){
        dumpBookmarks($('#search').val());
     });
});

document.addEventListener('DOMContentLoaded', function () {
  $('#search').focus() ;
});
