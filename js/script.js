
(function ($) {
	$(function () {
		$('.pageForm').submit(function () {
			if ($('input[name=PageName]').val().length == 0) {
				alert("You must provide a page name");
				return false;
			}
		})
		
		$('input[name=PageName]').blur(function () {
			// check if it already exists
			var input = $(this);
			$.get('page/checkname', {name: $(this).val(), id: $('input[name=id]').val()}, function(data) { 
				 if (data && data.exists) {
					 input.css({'border': '1px solid red'})
					 input.siblings('label').text('Page name (must be unique)');
				 } else {
					 input.css({'border': '1px solid #ccc'})
					 input.siblings('label').text('Page name');
				 }
			});
		})
	})
})(jQuery);