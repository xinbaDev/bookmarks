function save_options() {
  var width = document.getElementById('width').value;
  var height = document.getElementById('height').value;
  chrome.storage.sync.set({
    width: width,
    height: height
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    width: 200,
    height: 500
  }, function(items) {
    document.getElementById('width').value = items.width;
    document.getElementById('height').value = items.height;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);