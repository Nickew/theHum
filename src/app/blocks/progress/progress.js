$(function() {
	var valArray = [];
	var elArray = [];

	var $after = $('.h-progress__skill--after');

	$after.each(function () {
		valArray.push($(this).data('value'));
		elArray.push(this);
	});

	for(var i = 0; i < valArray.length; i++) {
		$(elArray[i]).css("width", '' + valArray[i] + '%');
	}
});