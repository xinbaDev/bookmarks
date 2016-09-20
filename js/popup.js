// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


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
  $('#bookmark_scrollable').height(items.height);
});



/*var pageTracker = _gat._getTracker("UA-84474303-1");
pageTracker._initData();pageTracker._trackPageview();*/