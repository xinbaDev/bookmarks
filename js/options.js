

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    old_bookmark_value: 2,
    privacy:true,
  }, function(items) {
    document.getElementById('old_bookmark').value = items.old_bookmark_value;
    $('#old_bookmark_value').text(items.old_bookmark_value + " years ago");
    $('#privacy').attr('checked',items.privacy);
    
  });
}

document.addEventListener('DOMContentLoaded', restore_options);


$('#old_bookmark').on("input change", function() {
    $('#old_bookmark_value').text(this.value + " years ago");
    localStorage['old_bookmark_value'] = this.value;
    chrome.storage.sync.set({
        old_bookmark_value: this.value,

    });
});


$('#privacy').change(function() {
    var status = $(this)[0].checked;
    chrome.storage.sync.set({
        privacy: status,
    });
});