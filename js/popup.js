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


