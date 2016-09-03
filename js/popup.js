// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.



var bookmarkManager = new bookmarkModel.bookmark();

//get all the bookmarks
chrome.bookmarks.getTree(bookmarkManager.getBookmarks);

utility.adjustHtmlSize();

document.addEventListener('DOMContentLoaded', function () {
  $('#search').focus() ;
});

document.querySelector('#bookmark-options').addEventListener("click", function() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
});

chrome.storage.sync.get({
	width: 300,
	height: 500
}, function(items) {
	$('body').width(items.width);
  	$('#scrollable').css('max-height',400);  	
});

