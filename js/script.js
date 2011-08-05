
(function ($) {
	$(function () {
		$('.pageForm').submit(function () {
			if ($('input[name=PageName]').val().length == 0) {
				alert("You must provide a page name");
				return false;
			}
		})
	})
})(jQuery);