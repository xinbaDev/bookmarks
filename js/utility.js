
var utility = (function(){ 
	var adjustHtmlSize = function(){
	  var hegiht = $('.container').height() + 30;
      $('html').height(hegiht);  
      $('body').height(hegiht);  
	}
	return {adjustHtmlSize:adjustHtmlSize};
})();

$(function() {
     addEventListener('keyup',function(event){
        utility.adjustHtmlSize();
     });
});
