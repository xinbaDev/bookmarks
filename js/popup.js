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


document.querySelector('.app-name').addEventListener("click", function() {
	chrome.tabs.create({url: "https://chrome.google.com/webstore/detail/bookmark-helper/anfdnhenkombplichcifaiecpcfifhdp/"});
});

